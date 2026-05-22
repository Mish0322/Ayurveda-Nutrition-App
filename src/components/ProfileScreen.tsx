export function ProfileScreen() {
    return (
      <div className="h-full overflow-auto px-6 pt-6 pb-28 space-y-6">
        <div>
          <div className="text-lg font-semibold text-neutral-900">Profile</div>
          <p className="mt-1 text-sm text-neutral-600">
            Your constitution + gentle long-term guidance.
          </p>
        </div>
  
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-neutral-900">Your Constitution</div>
          <div className="mt-2 text-sm text-neutral-700">Pitta 40% | Vata 40% | Kapha 20%</div>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            You’re a Pitta–Vata blend: strong drive and digestion, with quick energy.
            When life is intense or chaotic, warm + grounding meals usually feel best.
          </p>
        </div>
  
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-neutral-900">Your Food Philosophy</div>
          <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
            Aim for balance, not perfection. Follow supportive choices most of the time (80%),
            and leave room for joy and flexibility (20%).
          </p>
        </div>
  
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-neutral-900">This Season</div>
          <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
            Winter tends to amplify Vata and Kapha. Warm, nourishing, slightly oily foods can help
            you feel steady and grounded.
          </p>
        </div>
  
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-neutral-900">Notes</div>
          <p className="mt-2 text-sm text-neutral-500">
            (Optional) What have you noticed works for you?
          </p>
          <div className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-500">
            Example: “Smoothies make me bloated” • “Savory breakfasts feel best” • “Warm dinners help me sleep”
          </div>
        </div>
      </div>
    );
  }
  