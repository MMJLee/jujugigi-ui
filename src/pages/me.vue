<template>
    <v-container class="w-50">
        <v-form @submit.prevent>
            <v-text-field v-model="alias" label="Alias"></v-text-field>
            <v-btn @click="validate" block>Verify</v-btn>
            <v-btn @click="openConfirmModal" :disabled="!valid" type="submit" block>Submit</v-btn>
        </v-form>
    </v-container>
    <v-dialog v-model="confirmModal" persistent>
        <v-card class="mx-auto pb-4" width="600">
            <v-card-title>
                <v-row justify="space-between">
                    <v-col>
                        Set alias to: <strong> {{ alias }} </strong> </v-col>
                    <v-btn icon @click="closeConfirmModal">
                        <v-icon dense>mdi-close</v-icon>
                    </v-btn>
                </v-row>
            </v-card-title>
            <v-card-subtitle>
                <v-row align="center">
                    <v-col>
                        *alias can be changed every 90 days
                    </v-col>
                    <v-btn @click="submit">
                        Confirm
                    </v-btn>
                </v-row>
            </v-card-subtitle>
        </v-card>
    </v-dialog>
</template>

<script>
import UserAliasAPI from "@/api/user_alias"
import { mapActions, mapWritableState } from 'pinia'
import { useAliasStore } from '@/stores/alias'
import { useAlertStore } from '@/stores/alert'

export default {
    name: 'me',
    data() {
        return {
            alias: "",
            loading: false,
            valid: false,
            confirmModal: false
        }
    },
    watch: {
        alias(newAlias) {
            this.valid = false
        }
    },
    computed: {
        ...mapWritableState(useAliasStore, ['userAlias']),
    },
    methods: {
        ...mapActions(useAlertStore, ['handleError', 'emitAlert']),
        async validate() {
            this.loading = true
            try {
                let res = await UserAliasAPI.read({ "user_alias": this.alias })
                if (res?.data?.length == 0) {
                    this.valid = true
                } else {
                    this.emitAlert(true, 'warning', 'This alias is taken')
                }
            } catch (err) {
                this.handleError(err)
            } finally {
                this.loading = false
            }
        },
        async submit() {
            this.loading = true
            try {
                let res = await UserAliasAPI.create({ "user_alias": this.alias })
                if (res?.data?.added > 0) {
                    this.userAlias = this.alias
                    this.emitAlert(true, 'success', 'Alias successfully set')
                } else {
                    this.emitAlert(true, 'warning', 'Error setting alias')
                }
            } catch (err) {
                this.handleError(err)
            } finally {
                this.loading = false
            }
        },
        openConfirmModal() {
            this.confirmModal = true
        },
        closeConfirmModal() {
            this.confirmModal = false
        }
    }
}
</script>