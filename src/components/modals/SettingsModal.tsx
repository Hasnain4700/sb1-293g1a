import React, { useState } from 'react';
import useStore from '../../store/useStore';
import Button from '../ui/Button';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useStore();
  const [formData, setFormData] = useState(settings);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="currency" className="mb-2 block text-sm font-medium">
              Currency Symbol
            </label>
            <input
              type="text"
              id="currency"
              value={formData.currency}
              onChange={(e) =>
                setFormData({ ...formData, currency: e.target.value })
              }
              className="w-full rounded-md border p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lowBalanceThreshold"
              className="mb-2 block text-sm font-medium"
            >
              Low Balance Threshold
            </label>
            <input
              type="number"
              id="lowBalanceThreshold"
              value={formData.lowBalanceThreshold}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lowBalanceThreshold: Number(e.target.value),
                })
              }
              className="w-full rounded-md border p-2"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.notifications}
                onChange={(e) =>
                  setFormData({ ...formData, notifications: e.target.checked })
                }
                className="mr-2"
              />
              <span className="text-sm">Enable Notifications</span>
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Settings</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;