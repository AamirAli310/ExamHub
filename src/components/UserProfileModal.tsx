import React, { useState } from 'react';
import { UserProfile } from '../types/exam';
import {
  X,
  User,
  Mail,
  GraduationCap,
  Plus,
  CheckCircle2,
  Users,
} from 'lucide-react';

interface UserProfileModalProps {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (user: UserProfile) => void;
  onCreateUser: (newUser: UserProfile) => void;
}

export const AVATAR_COLORS = [
  '#0f766e', // teal
  '#f59e0b', // amber
  '#6366f1', // indigo
  '#ec4899', // pink
  '#10b981', // emerald
  '#0284c7', // sky
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  currentUser,
  allUsers,
  isOpen,
  onClose,
  onSelectUser,
  onCreateUser,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newGrade, setNewGrade] = useState('Year 6 / Grade 5');
  const [newColor, setNewColor] = useState(AVATAR_COLORS[0]);

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim() || `${newName.toLowerCase().replace(/\s+/g, '')}@student.org`,
      gradeLevel: newGrade,
      avatarColor: newColor,
      createdAt: new Date().toISOString(),
    };

    onCreateUser(user);
    onSelectUser(user);
    setIsCreating(false);
    setNewName('');
    setNewEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1E293B] text-white flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Student Profile System</h2>
              <p className="text-xs text-slate-300">
                Track exam progress, Stanine history, and diagnostic recommendations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Active User Card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-sm"
                style={{ backgroundColor: currentUser.avatarColor }}
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-slate-900 text-sm">{currentUser.name}</h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-teal-100 text-teal-800">
                    Active
                  </span>
                </div>
                <p className="text-xs text-slate-500">{currentUser.email}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Target: {currentUser.gradeLevel || 'Year 6 / Grade 5'}
                </p>
              </div>
            </div>
          </div>

          {/* Switch Profiles List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                Select Profile
              </span>
              <button
                onClick={() => setIsCreating(!isCreating)}
                className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isCreating ? 'Cancel' : 'New Profile'}</span>
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {allUsers.map((u) => {
                const isSelected = u.id === currentUser.id;
                return (
                  <div
                    key={u.id}
                    onClick={() => {
                      onSelectUser(u);
                      setIsCreating(false);
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs"
                        style={{ backgroundColor: u.avatarColor }}
                      >
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">{u.name}</div>
                        <div className="text-[11px] text-slate-500">{u.gradeLevel}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Create New Profile Form */}
          {isCreating && (
            <form
              onSubmit={handleRegister}
              className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-3 text-xs animate-fade-in"
            >
              <h4 className="font-bold text-teal-950 text-sm">Register Student Profile</h4>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Parker"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="student@school.edu"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <GraduationCap className="w-3 h-3 text-slate-400" />
                    Target Grade / Year
                  </label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Year 4 / Grade 3 (Level A)">Year 4 / Grade 3 (Level A)</option>
                    <option value="Year 5 / Grade 4 (Level B)">Year 5 / Grade 4 (Level B)</option>
                    <option value="Year 6 / Grade 5 (Level C/D)">Year 6 / Grade 5 (Level C/D)</option>
                    <option value="Year 7 / Grade 6 (Level E)">Year 7 / Grade 6 (Level E)</option>
                    <option value="Year 8+ / Grade 7+ (Level F/G)">Year 8+ / Grade 7+ (Level F/G)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Avatar Color Theme</label>
                <div className="flex gap-2">
                  {AVATAR_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        newColor === c ? 'scale-110 border-slate-900 shadow-sm' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg shadow-sm"
                >
                  Register Profile
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
