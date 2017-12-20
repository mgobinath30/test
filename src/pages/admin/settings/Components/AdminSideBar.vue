<template>
<v-card height="100%" class="mt-2" dark>
    <br />
    <br />
    <br />
    <br />
    <br />
    <v-list dense dark class="mt-4">
        <v-list-tile
            :key="i"
            v-for="(item, i) in items"
            router
            :to="item.link"
        >
            <v-list-tile-action>
            <v-icon dark>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
            <v-list-tile-title>
                {{ item.text }}
            </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
    </v-card>
</template>
<script>
export default {
  data: () => ({
    items: [
    { icon: 'settings', text: 'Home', link: '/admin/settings/home' },
    { icon: 'collections', text: 'Settings/Configuration', link: '/admin/settings/pages' },
    { icon: 'group', text: 'Users Administration', link: '/admin/settings/users' },
    { icon: 'group', text: 'Requests', link: '/admin/settings/requests' },
    { icon: 'group', text: 'Priviledges', link: '/admin/settings/priviledges' },
    { icon: 'subscriptions', text: 'Data Download', link: '' },
    { icon: 'subscriptions', text: 'Manage Integrations', link: '' },
    { icon: 'subscriptions', text: 'Other Reporting', link: '/admin/settings/gareport' },
    { icon: 'event_note', text: 'Help/Support', link: '' }
    ]
  })
}
</script>
