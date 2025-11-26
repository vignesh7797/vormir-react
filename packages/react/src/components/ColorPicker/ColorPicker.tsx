import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

const PRESET_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#64748b', '#000000', '#ffffff',
];

export interface ColorPickerProps {
  /** Selected color (HEX) */
  value?: string;
  /** Default color (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (color: string) => void;
  /** Whether to show preset swatches */
  showPresets?: boolean;
  /** Custom preset colors */
  presetColors?: string[];
  /** Whether to show HEX input */
  showInput?: boolean;
  /** Whether to show RGB inputs */
  showRgbInputs?: boolean;
  /** Whether the colorpicker is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result && result[1] && result[2] && result[3]
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value: controlledValue,
  defaultValue = '#3b82f6',
  onChange,
  showPresets = true,
  presetColors = PRESET_COLORS,
  showInput = true,
  showRgbInputs = false,
  disabled = false,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const rgb = hexToRgb(value);

  const handleColorChange = (color: string) => {
    if (disabled) return;
    
    // Ensure color starts with #
    const formattedColor = color.startsWith('#') ? color : `#${color}`;
    
    if (controlledValue === undefined) {
      setInternalValue(formattedColor);
    }
    onChange?.(formattedColor);
  };

  const handleRgbChange = (component: 'r' | 'g' | 'b', valueStr: string) => {
    if (!rgb) return;
    
    const numValue = parseInt(valueStr) || 0;
    const clampedValue = Math.max(0, Math.min(255, numValue));
    
    const newRgb = { ...rgb, [component]: clampedValue };
    handleColorChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  return (
    <div className={cn('inline-block p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950', disabled && 'opacity-50', className)}>
      {/* Current Color Display */}
      <div className="mb-4">
        <div
          className="w-full h-20 rounded-lg border-2 border-neutral-200 dark:border-neutral-800 mb-2"
          style={{ backgroundColor: value }}
        />
        <div className="text-center text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {value.toUpperCase()}
        </div>
      </div>

      {/* Preset Swatches */}
      {showPresets && (
        <div className="mb-4">
          <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">
            Presets
          </div>
          <div className="grid grid-cols-10 gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                disabled={disabled}
                className={cn(
                  'w-8 h-8 rounded border-2 transition-all hover:scale-110',
                  value.toLowerCase() === color.toLowerCase()
                    ? 'border-neutral-900 dark:border-neutral-100 ring-2 ring-offset-2 ring-blue-500'
                    : 'border-neutral-200 dark:border-neutral-700'
                )}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              >
                {value.toLowerCase() === color.toLowerCase() && (
                  <Check className="w-4 h-4 text-white drop-shadow-lg mx-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* HEX Input */}
      {showInput && (
        <div className="mb-3">
          <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
            HEX
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => handleColorChange(e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#000000"
          />
        </div>
      )}

      {/* RGB Inputs */}
      {showRgbInputs && rgb && (
        <div>
          <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">
            RGB
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(['r', 'g', 'b'] as const).map((component) => (
              <div key={component}>
                <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1 uppercase">
                  {component}
                </label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb[component]}
                  onChange={(e) => handleRgbChange(component, e.target.value)}
                  disabled={disabled}
                  className="w-full px-2 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Native Color Picker */}
      <div className="mt-3">
        <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
          Custom
        </label>
        <input
          type="color"
          value={value}
          onChange={(e) => handleColorChange(e.target.value)}
          disabled={disabled}
          className="w-full h-10 rounded cursor-pointer disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
};

ColorPicker.displayName = 'ColorPicker';
