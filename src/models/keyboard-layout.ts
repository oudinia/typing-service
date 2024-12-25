export type KeyMapping = {
  [key: string]: string;
};

export interface KeyboardLayout {
  name: string;
  mapping: KeyMapping;
}

export type LayoutName = 'qwerty' | 'azerty';