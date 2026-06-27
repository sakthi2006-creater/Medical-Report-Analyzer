import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealth } from '@/context/HealthContext';
import { analyzeHealth } from '@/lib/healthAnalyzer';
import { HealthInput } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { ClipboardList } from 'lucide-react';

export default function HealthEntryPage() {
  const navigate = useNavigate();
  const { setHealthInput, setHealthReport } = useHealth();

  const [form, setForm] = useState({
    age: '',
    gender: 'male' as 'male' | 'female',
    height: '',
    weight: '',
    activityLevel: 'light' as HealthInput['activityLevel'],
    dietPreference: 'vegetarian' as HealthInput['dietPreference'],
    hemoglobin: '',
    bloodSugarFasting: '',
    bpSystolic: '',
    bpDiastolic: '',
    cholesterol: '',
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input: HealthInput = {
      age: Number(form.age),
      gender: form.gender,
      height: Number(form.height),
      weight: Number(form.weight),
      activityLevel: form.activityLevel,
      dietPreference: form.dietPreference,
      hemoglobin: form.hemoglobin ? Number(form.hemoglobin) : undefined,
      bloodSugarFasting: form.bloodSugarFasting ? Number(form.bloodSugarFasting) : undefined,
      bpSystolic: form.bpSystolic ? Number(form.bpSystolic) : undefined,
      bpDiastolic: form.bpDiastolic ? Number(form.bpDiastolic) : undefined,
      cholesterol: form.cholesterol ? Number(form.cholesterol) : undefined,
    };
    setHealthInput(input);
    setHealthReport(analyzeHealth(input));
    navigate('/results');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <ClipboardList className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="elder-heading">Enter Your Health Data</h1>
          <p className="text-muted-foreground">Fill in the values from your health report</p>
        </div>
      </div>

      <DisclaimerBanner />

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Basic Info */}
        <section className="bg-card rounded-xl border border-border p-6 shadow-card">
          <h2 className="font-display font-bold text-lg mb-4 text-card-foreground">👤 Basic Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age" className="text-base font-semibold">Age *</Label>
              <Input id="age" type="number" placeholder="e.g. 55" value={form.age} onChange={e => update('age', e.target.value)} required min={1} max={120} className="mt-1 text-lg h-12" />
            </div>
            <div>
              <Label className="text-base font-semibold">Gender *</Label>
              <Select value={form.gender} onValueChange={v => update('gender', v)}>
                <SelectTrigger className="mt-1 h-12 text-lg"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="height" className="text-base font-semibold">Height (cm) *</Label>
              <Input id="height" type="number" placeholder="e.g. 165" value={form.height} onChange={e => update('height', e.target.value)} required min={50} max={250} className="mt-1 text-lg h-12" />
            </div>
            <div>
              <Label htmlFor="weight" className="text-base font-semibold">Weight (kg) *</Label>
              <Input id="weight" type="number" placeholder="e.g. 70" value={form.weight} onChange={e => update('weight', e.target.value)} required min={10} max={300} className="mt-1 text-lg h-12" />
            </div>
            <div>
              <Label className="text-base font-semibold">Activity Level</Label>
              <Select value={form.activityLevel} onValueChange={v => update('activityLevel', v)}>
                <SelectTrigger className="mt-1 h-12 text-lg"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little movement)</SelectItem>
                  <SelectItem value="light">Light (some walking)</SelectItem>
                  <SelectItem value="moderate">Moderate (regular exercise)</SelectItem>
                  <SelectItem value="active">Active (daily exercise)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base font-semibold">Diet Preference</Label>
              <Select value={form.dietPreference} onValueChange={v => update('dietPreference', v)}>
                <SelectTrigger className="mt-1 h-12 text-lg"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Health Values */}
        <section className="bg-card rounded-xl border border-border p-6 shadow-card">
          <h2 className="font-display font-bold text-lg mb-2 text-card-foreground">🩺 Health Values</h2>
          <p className="text-sm text-muted-foreground mb-4">Fill in any values you have. Leave blank if unknown.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hb" className="text-base font-semibold">Hemoglobin (g/dL)</Label>
              <Input id="hb" type="number" step="0.1" placeholder="e.g. 13.5" value={form.hemoglobin} onChange={e => update('hemoglobin', e.target.value)} className="mt-1 text-lg h-12" />
            </div>
            <div>
              <Label htmlFor="sugar" className="text-base font-semibold">Blood Sugar – Fasting (mg/dL)</Label>
              <Input id="sugar" type="number" placeholder="e.g. 95" value={form.bloodSugarFasting} onChange={e => update('bloodSugarFasting', e.target.value)} className="mt-1 text-lg h-12" />
            </div>
            <div>
              <Label htmlFor="bps" className="text-base font-semibold">BP – Systolic (upper)</Label>
              <Input id="bps" type="number" placeholder="e.g. 120" value={form.bpSystolic} onChange={e => update('bpSystolic', e.target.value)} className="mt-1 text-lg h-12" />
            </div>
            <div>
              <Label htmlFor="bpd" className="text-base font-semibold">BP – Diastolic (lower)</Label>
              <Input id="bpd" type="number" placeholder="e.g. 80" value={form.bpDiastolic} onChange={e => update('bpDiastolic', e.target.value)} className="mt-1 text-lg h-12" />
            </div>
            <div>
              <Label htmlFor="chol" className="text-base font-semibold">Total Cholesterol (mg/dL)</Label>
              <Input id="chol" type="number" placeholder="e.g. 190" value={form.cholesterol} onChange={e => update('cholesterol', e.target.value)} className="mt-1 text-lg h-12" />
            </div>
          </div>
        </section>

        <Button type="submit" size="lg" className="w-full bg-gradient-primary text-primary-foreground font-bold text-lg h-14 rounded-xl shadow-elevated hover:opacity-90 transition-opacity">
          Analyze My Health Report
        </Button>
      </form>
    </div>
  );
}
