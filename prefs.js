import Adw from 'gi://Adw';

import {
    ExtensionPreferences,
} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class QuakeMagicLampCompatibilityPreferences
    extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        const page = new Adw.PreferencesPage({
            title: 'Quake Magic Lamp Compatibility',
        });

        const group = new Adw.PreferencesGroup({
            title: 'Magic Lamp',
            description:
                'Control Magic Lamp effects applied to Quake Terminal.',
        });

        const minimizeRow = new Adw.SwitchRow({
            title: 'Disable Magic Lamp on minimize',
            subtitle:
                'Prevent Magic Lamp’s minimize animation from affecting Quake Terminal.',
        });

        const restoreRow = new Adw.SwitchRow({
            title: 'Disable Magic Lamp on restore',
            subtitle:
                'Prevent Magic Lamp’s restore animation from affecting Quake Terminal.',
        });

        settings.bind(
            'disable-on-minimize',
            minimizeRow,
            'active',
            0
        );

        settings.bind(
            'disable-on-restore',
            restoreRow,
            'active',
            0
        );

        group.add(minimizeRow);
        group.add(restoreRow);

        page.add(group);
        window.add(page);
    }
}
