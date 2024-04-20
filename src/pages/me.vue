<template>
    <v-container>
        <v-card>
            <v-card-title>Please set an alias</v-card-title>
            <v-card-subtitle v-if="userAlias">Current alias: <strong>{{ userAlias }}</strong></v-card-subtitle>
            <v-card-subtitle>*alias can be changed every 90 days</v-card-subtitle>
            <v-form v-model="validForm">
                <v-text-field v-model="alias" label="Alias" :rules="rules"></v-text-field>
                <v-row>
                    <v-col class="px-0">
                        <v-btn block @click="checkAlias" :disabled="!validForm">Verify</v-btn>
                    </v-col>
                    <v-col class="px-0">
                        <v-btn block @click="openConfirmModal" :disabled="!validAlias">Submit</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
        <v-dialog v-model="confirmModal" persistent>
            <v-card class="mx-auto pb-4">
                <v-card-title>
                    <v-row class="my-1">
                        <v-col>
                            Set alias to: <strong> {{ alias }} </strong> </v-col>
                        <v-btn icon @click="closeConfirmModal">
                            <v-icon dense>mdi-close</v-icon>
                        </v-btn>
                    </v-row>
                </v-card-title>
                <v-card-subtitle>
                    <v-row class="my-1" align="center">
                        <v-col>
                            *alias can be changed every 90 days
                        </v-col>
                        <v-btn @click="submit" color="success">
                            Confirm
                        </v-btn>
                    </v-row>
                </v-card-subtitle>
            </v-card>
        </v-dialog>
    </v-container>
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
            confirmModal: false,
            validForm: false,
            validAlias: false,
            rules: [
                v => !!v || 'alias is required',
                v => v.length >= 4 || 'alias must be at least 4 characters',
                v => v.length <= 9 || 'alias must be at most 9 characters',
                v => /^[\w]+$/.test(v) || 'alias cannot contain special characters',
            ],
            today: new Date()
        }
    },
    watch: {
        alias(newAlias) {
            this.validAlias = false
        }
    },
    computed: {
        ...mapWritableState(useAliasStore, ['userAlias'], ['updatedOn']),
    },
    methods: {
        ...mapActions(useAlertStore, ['handleError', 'emitAlert']),
        timeLimit() {
            if (this.updatedOn) {
                let updatedDate = new Date(this.updatedOn)
                let ninetyDaysLater = new Date()
                ninetyDaysLater.setDate(ninetyDaysLater.getDate() + (90))
                if (ninetyDaysLater > updatedDate) {
                    return false
                }
            }
            return true
        },
        async checkAlias() {
            try {
                this.loading = true
                let res = await UserAliasAPI.read({ "user_alias": this.alias })
                if (res?.data?.length == 0) {
                    this.emitAlert(true, 'success', 'alias is available', 3)
                    this.validAlias = true
                } else {
                    this.emitAlert(true, 'warning', 'alias is taken', 3)
                    this.validAlias = false
                }
            } catch (err) {
                this.handleError(err)
            } finally {
                this.loading = false
            }
        },
        async submit() {
            if (this.timeLimit()) {
                try {
                    this.loading = true
                    let res
                    if (this.userAlias) {
                        res = await UserAliasAPI.update({ "user_alias": this.alias })
                        if (res?.data?.updated > 0) {
                            this.userAlias = this.alias
                            this.updatedOn = new Date()
                            this.emitAlert(true, 'success', 'alias successfully set', 3)
                        } else {
                            this.emitAlert(true, 'warning', 'error updating alias', 3)
                        }
                    }
                    else {
                        res = await UserAliasAPI.create({ "user_alias": this.alias })
                        if (res?.data?.added > 0) {
                            this.userAlias = this.alias
                            this.updatedOn = new Date()
                            this.emitAlert(true, 'success', 'alias successfully set', 3)
                            this.$router.push({ path: `/` })
                        } else {
                            this.emitAlert(true, 'warning', 'error creating alias', 3)
                        }
                    }
                } catch (err) {
                    this.handleError(err)
                } finally {
                    this.confirmModal = false
                    this.loading = false
                }
            } else {
                this.emitAlert(true, 'warning', 'alias can be changed every 90 days', 3)
                this.confirmModal = false
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