import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

const QUAKE_ACTOR_NAME = 'quake-terminal';

const MAGIC_LAMP_MINIMIZE_EFFECT = 'MagicLampMinimizeEffect';
const MAGIC_LAMP_UNMINIMIZE_EFFECT = 'MagicLampUnminimizeEffect';

export default class QuakeMagicLampCompatibility extends Extension {
    enable() {
        this._settings = null;
        this._minimizeId = null;
        this._unminimizeId = null;
        this._enabled = false;

        try {
            this._settings = this.getSettings();

            if (!global.window_manager) {
                console.error(
                    `[${this.uuid}] Window manager is unavailable`
                );
                return;
            }

            this._minimizeId = global.window_manager.connect(
                'minimize',
                (_wm, actor) => {
                    this._handleWindowEvent(
                        actor,
                        'disable-on-minimize',
                        MAGIC_LAMP_MINIMIZE_EFFECT
                    );
                }
            );

            this._unminimizeId = global.window_manager.connect(
                'unminimize',
                (_wm, actor) => {
                    this._handleWindowEvent(
                        actor,
                        'disable-on-restore',
                        MAGIC_LAMP_UNMINIMIZE_EFFECT
                    );
                }
            );

            this._enabled = true;
            console.log(`[${this.uuid}] enabled`);
        } catch (error) {
            console.error(
                `[${this.uuid}] Failed to enable compatibility handling:`,
                error
            );

            this._disconnectSignals();
            this._settings = null;
            this._enabled = false;
        }
    }

    _handleWindowEvent(actor, settingKey, effectName) {
        if (!this._enabled || !this._settings)
            return;

        try {
            if (!this._settings.get_boolean(settingKey))
                return;
        } catch (error) {
            console.error(
                `[${this.uuid}] Failed to read setting ${settingKey}:`,
                error
            );
            return;
        }

        try {
            this._suppressMagicLamp(actor, effectName);
        } catch (error) {
            // Compatibility code must never interfere with normal GNOME Shell
            // window handling if something unexpected happens.
            console.error(
                `[${this.uuid}] Failed to suppress Magic Lamp effect:`,
                error
            );
        }
    }

    _suppressMagicLamp(actor, wantedEffectName) {
        if (!actor)
            return;

        let actorName;

        try {
            actorName = actor.get_name();
        } catch {
            return;
        }

        if (actorName !== QUAKE_ACTOR_NAME)
            return;

        let effects;

        try {
            effects = actor.get_effects();
        } catch {
            return;
        }

        if (!Array.isArray(effects))
            return;

        for (const effect of effects) {
            if (!effect)
                continue;

            let effectName;

            try {
                effectName = effect.constructor?.name ?? '';
            } catch {
                continue;
            }

            if (effectName !== wantedEffectName)
                continue;

            try {
                effect.destroy();
            } catch {
                // The effect may already have been destroyed.
            }

            return;
        }
    }

    _disconnectSignals() {
        if (!global.window_manager)
            return;

        if (this._minimizeId !== null) {
            try {
                global.window_manager.disconnect(this._minimizeId);
            } catch {
                // Signal may already have been disconnected.
            }

            this._minimizeId = null;
        }

        if (this._unminimizeId !== null) {
            try {
                global.window_manager.disconnect(this._unminimizeId);
            } catch {
                // Signal may already have been disconnected.
            }

            this._unminimizeId = null;
        }
    }

    disable() {
        this._enabled = false;
        this._disconnectSignals();
        this._settings = null;

        console.log(`[${this.uuid}] disabled`);
    }
}
