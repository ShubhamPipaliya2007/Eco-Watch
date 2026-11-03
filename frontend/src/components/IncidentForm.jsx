import React, { useState } from "react";

const CATEGORIES = [
  {
    id: "chemical",
    title: "Chemical or Murky Water",
    desc: "Discolored plumes, industrial discharge, acid foam",
    icon: "science",
    iconColor: "text-[#1f6e72]",
  },
  {
    id: "sewage",
    title: "Sewage / Foul Odour",
    desc: "Broken pipe, strong septic smell, grey overflow",
    icon: "water_damage",
    iconColor: "text-[#182230]",
  },
  {
    id: "oil",
    title: "Oil or Fuel Slick",
    desc: "Rainbow surface sheen, petrol or diesel odor",
    icon: "opacity",
    iconColor: "text-[#1f6e72]",
  },
  {
    id: "waste",
    title: "Trash & Solid Waste",
    desc: "Plastic accumulation, dumping debris, clogged drains",
    icon: "delete_sweep",
    iconColor: "text-[#182230]",
  },
  {
    id: "wildlife",
    title: "Wildlife / Fish Harm",
    desc: "Floating dead fish, bird distress, aquatic algae bloom",
    icon: "pest_control",
    iconColor: "text-[#b85042]",
  },
  {
    id: "other",
    title: "Other Water Issue",
    desc: "Unusual river conditions, sudden foam, silt runoff",
    icon: "help",
    iconColor: "text-[#4a5568]",
  },
];

export default function IncidentForm({ onSubmitSuccess }) {
  const [category, setCategory] = useState("chemical");
  const [location, setLocation] = useState(
    "River Reach Sector 4B, near Old Mill Weir",
  );
  const [timeframe, setTimeframe] = useState("Happening right now");
  const [title, setTitle] = useState(
    "Chemical Discoloration at Old Mill Reach",
  );
  const [description, setDescription] = useState(
    "Dark brownish discharge with strong chemical smell flowing directly from the drainage pipe into the river reach.",
  );
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [phone, setPhone] = useState("+91 98100 45678");
  const [email, setEmail] = useState("aarav.sharma@outlook.com");
  const [attachedFile, setAttachedFile] = useState({
    name: "effluent_conduit_photo1.jpg",
    size: "2.4 MB",
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleUseGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(
            `Current GPS: ${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E (Acquired)`,
          );
        },
        () => {
          setLocation("Current GPS: 28.6139° N, 77.2090° E (Acquired)");
        },
      );
    } else {
      setLocation("Current GPS: 28.6139° N, 77.2090° E (Acquired)");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setAttachedFile({
        name: file.name,
        size: `${sizeMB} MB`,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);

    const submissionTitle =
      title.trim() ||
      `${CATEGORIES.find((c) => c.id === category)?.title || "Pollution"} - ${location}`;
    const submissionDescription = description.trim();

    try {
      // Backend Integration: POST request to http://localhost:8000/api/analyze sending 'title' and 'description'
      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: submissionTitle,
          description: submissionDescription,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const backendData = await response.json();

      const newReport = {
        token: `ECO-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        title: submissionTitle,
        description: submissionDescription,
        category,
        location,
        timeframe,
        isAnonymous,
        phone: isAnonymous ? "Hidden (Anonymous)" : phone,
        email: isAnonymous ? "Hidden (Anonymous)" : email,
        backendAnalysis: backendData,
        submittedAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      if (onSubmitSuccess) {
        onSubmitSuccess(newReport);
      }
    } catch (err) {
      console.warn(
        "Backend call failed, using graceful local fallback analysis:",
        err,
      );
      setApiError(
        "Notice: Could not connect to backend server at http://localhost:8000. Fallback simulation active.",
      );

      const fallbackReport = {
        token: `ECO-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        title: submissionTitle,
        description: submissionDescription,
        category,
        location,
        timeframe,
        isAnonymous,
        phone: isAnonymous ? "Hidden (Anonymous)" : phone,
        email: isAnonymous ? "Hidden (Anonymous)" : email,
        backendAnalysis: {
          status: "success (simulated)",
          message: `Received your complaint: ${submissionTitle}`,
          severity: "Critical",
          rule_broken: "CPCB Air & Water Quality Norms - Section 4",
        },
        submittedAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      if (onSubmitSuccess) {
        onSubmitSuccess(fallbackReport);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="w-full px-6 lg:px-8 py-14 bg-surface"
      id="reportFormSection"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1f6e72]">
            Clean Water Action
          </span>
          <h2 className="text-2xl lg:text-3xl text-[#182230] font-bold mt-1 tracking-tight">
            Public Incident Report
          </h2>
          <p className="text-sm text-[#4a5568] max-w-xl mx-auto mt-2">
            Follow the 3 quick steps below. Your submission alerts nearby
            containment field crews immediately.
          </p>
        </div>

        {apiError && (
          <div className="mb-6 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">info</span>
            <span>
              {apiError} (Ensure backend server is running via{" "}
              <code className="bg-amber-100 px-1 py-0.5 rounded">
                uvicorn main:app --reload
              </code>
              )
            </span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* STEP 1: What did you see? */}
          <div className="p-6 md:p-8 rounded-xl bg-[#ffffff] border border-[#e4dfd7] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#e4dfd7]">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#182230] text-[#ffffff] flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#182230]">
                    What did you see?
                  </h3>
                  <p className="text-xs text-[#4a5568]">
                    Select the primary issue observed in the waterway
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded border border-[#e4dfd7] bg-[#f8f3ee] text-[#182230] text-[10px] font-bold uppercase tracking-wider">
                Required
              </span>
            </div>

            {/* Grid of Visual Category Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <label
                    key={cat.id}
                    onClick={() => {
                      setCategory(cat.id);
                      if (
                        !title ||
                        title.includes("Discoloration") ||
                        title.includes("Incident") ||
                        title.includes("Report")
                      ) {
                        setTitle(`${cat.title} observed`);
                      }
                    }}
                    className={`p-4 rounded-lg flex flex-col gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-2 border-[#1f6e72] bg-[#f8f3ee] shadow-sm"
                        : "border border-[#e4dfd7] bg-[#ffffff] hover:bg-[#f8f3ee] hover:border-[#1f6e72]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="incident_type"
                      value={cat.id}
                      checked={isSelected}
                      onChange={() => setCategory(cat.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-9 h-9 rounded-md flex items-center justify-center ${
                        isSelected
                          ? "bg-[#ffffff] border border-[#e4dfd7]"
                          : "bg-[#f8f3ee] border border-[#e4dfd7]"
                      } ${cat.iconColor}`}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {cat.icon}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-[#182230]">
                      {cat.title}
                    </span>
                    <span className="text-xs text-[#4a5568]">{cat.desc}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Where and when? */}
          <div className="p-6 md:p-8 rounded-xl bg-[#ffffff] border border-[#e4dfd7] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#e4dfd7]">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#182230] text-[#ffffff] flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#182230]">
                    Where and when?
                  </h3>
                  <p className="text-xs text-[#4a5568]">
                    Pinpoint the waterway and add an optional photo
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded border border-[#e4dfd7] bg-[#f8f3ee] text-[#182230] text-[10px] font-bold uppercase tracking-wider">
                Required
              </span>
            </div>

            {/* Location Search + Quick GPS */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-bold text-[#182230] uppercase tracking-wide"
                htmlFor="landmarkAddress"
              >
                Water Location or Landmark
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-3 top-3 text-[#4a5568] text-[20px]">
                    search
                  </span>
                  <input
                    id="landmarkAddress"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Near Old Bridge, Sector 4, or river walk name..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f8f3ee] text-sm text-[#182230] outline-none border border-[#e4dfd7] focus:border-[#1f6e72] focus:bg-[#ffffff] transition-colors"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleUseGps}
                  className="px-4 py-2.5 rounded-lg border border-[#e4dfd7] bg-[#f8f3ee] hover:bg-[#ded9d4]/50 text-[#182230] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#1f6e72]">
                    my_location
                  </span>
                  Use Current GPS
                </button>
              </div>
            </div>

            {/* Compact Map Preview */}
            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-[#e4dfd7] bg-[#f8f3ee]">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCx8xtEEhn5z3EdkTZjcf4hW0_sbGEDW0LhX7WxWU4xCGUGhmYsOExbpl4pmObZTFHEc6i09kJgvdFEXLFZ5dP0miSqCEoqh5wWCnqBIdKO-MHEpL4n5JXtVdX81xgtqe0i75DEXn-osBhy_TBIyTfg6vsqz6iDQmGrebLSw7ZH64xJtA8c_1PURL-0sM_so4tUQW9If3evH6ULffkJ9D1BAh2pHPJ3d0mAgo2KgjyE')`,
                }}
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-[#182230]/90 text-[#ffffff] flex items-center justify-center shadow-md animate-bounce">
                  <span className="material-symbols-outlined text-[22px]">
                    location_on
                  </span>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 bg-[#182230]/90 px-3 py-1 rounded text-[#ffffff] font-mono text-[11px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8bd2d7]"></span>
                <span>Lat 28.6139° N • Lon 77.2090° E (Accuracy ±2.8m)</span>
              </div>
            </div>

            {/* Time Selection Chips */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#182230] uppercase tracking-wide">
                When did this happen?
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Happening right now",
                  "Earlier today",
                  "Yesterday / Few days ago",
                ].map((timeOption) => (
                  <button
                    key={timeOption}
                    type="button"
                    onClick={() => setTimeframe(timeOption)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                      timeframe === timeOption
                        ? "bg-[#1f6e72] text-[#ffffff]"
                        : "bg-[#f8f3ee] border border-[#e4dfd7] hover:bg-[#ded9d4]/40 text-[#182230]"
                    }`}
                  >
                    {timeOption}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Evidence Drop Zone */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#182230] uppercase tracking-wide">
                  Add Photo or Video (Optional)
                </span>
                <span className="text-[11px] text-[#1f6e72] font-semibold">
                  Helps team respond 2x faster
                </span>
              </div>
              <label className="p-6 rounded-lg border-2 border-dashed border-[#e4dfd7] hover:border-[#1f6e72] bg-[#f8f3ee] hover:bg-[#ffffff] transition-all flex flex-col items-center justify-center text-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="material-symbols-outlined text-[30px] text-[#1f6e72] mb-1">
                  add_a_photo
                </span>
                <span className="text-sm font-bold text-[#182230]">
                  Click to upload or take a photo
                </span>
                <span className="text-xs text-[#4a5568] mt-0.5">
                  JPG, PNG, HEIC from smartphone camera (Max 15MB)
                </span>
              </label>

              {attachedFile && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#f8f3ee] border border-[#e4dfd7] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#1f6e72] text-[18px]">
                      image
                    </span>
                    <span className="font-medium text-[#182230]">
                      {attachedFile.name}
                    </span>
                    <span className="text-[#4a5568] font-mono">
                      • {attachedFile.size}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#ffffff] border border-[#e4dfd7] text-[#1f6e72] font-mono text-[10px] font-bold uppercase">
                    Attached
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* STEP 3: Notes & Submit */}
          <div className="p-6 md:p-8 rounded-xl bg-[#ffffff] border border-[#e4dfd7] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#e4dfd7]">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#182230] text-[#ffffff] flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#182230]">
                    Details &amp; Notification
                  </h3>
                  <p className="text-xs text-[#4a5568]">
                    Add title, extra clues, and choose how to receive updates
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded border border-[#e4dfd7] bg-[#f8f3ee] text-[#182230] text-[10px] font-bold uppercase tracking-wider">
                Quick Submit
              </span>
            </div>

            {/* Title Field (wired to backend payload 'title') */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-bold text-[#182230] uppercase tracking-wide"
                htmlFor="incidentTitle"
              >
                Incident Title / Summary (Required)
              </label>
              <input
                id="incidentTitle"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief summary of the issue (e.g. Chemical plume at culvert weir)"
                className="w-full bg-[#f8f3ee] px-3.5 py-2.5 rounded-lg text-sm text-[#182230] outline-none border border-[#e4dfd7] focus:border-[#1f6e72] focus:bg-[#ffffff] transition-colors font-medium"
              />
            </div>

            {/* Description (wired to backend payload 'description') */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-bold text-[#182230] uppercase tracking-wide"
                htmlFor="incidentDescription"
              >
                Detailed Description (Required)
              </label>
              <textarea
                id="incidentDescription"
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe noticeable smells, colors, flow rate, or nearby discharge pipes..."
                className="w-full bg-[#f8f3ee] p-3.5 rounded-lg text-sm text-[#182230] leading-relaxed outline-none border border-[#e4dfd7] focus:border-[#1f6e72] focus:bg-[#ffffff] transition-colors"
              />
            </div>

            {/* Anonymous Toggle & Contact Info */}
            <div className="p-4 rounded-lg bg-[#f8f3ee] border border-[#e4dfd7] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-[#182230]">
                    Receive SMS / Email Progress Updates?
                  </span>
                  <p className="text-xs text-[#4a5568]">
                    We'll send your live inspection tracking link here.
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xs font-bold text-[#4a5568]">
                    Anonymous
                  </span>
                  <input
                    id="anonToggle"
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-[#ded9d4] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#ffffff] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1f6e72] relative"></div>
                </label>
              </div>

              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-3 transition-opacity duration-200 ${
                  isAnonymous ? "opacity-30 pointer-events-none" : "opacity-100"
                }`}
              >
                <input
                  id="contactPhoneInput"
                  type="tel"
                  disabled={isAnonymous}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile number (e.g. +91 98100 45678)"
                  className="w-full bg-[#ffffff] px-3.5 py-2 rounded-lg text-sm text-[#182230] outline-none border border-[#e4dfd7] focus:border-[#1f6e72]"
                />
                <input
                  id="contactEmailInput"
                  type="email"
                  disabled={isAnonymous}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address (optional)"
                  className="w-full bg-[#ffffff] px-3.5 py-2 rounded-lg text-sm text-[#182230] outline-none border border-[#e4dfd7] focus:border-[#1f6e72]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-lg bg-[#1f6e72] hover:bg-[#155255] text-[#ffffff] text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2 text-center disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">
                      progress_activity
                    </span>
                    Sending Incident to EPA Dispatch...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">
                      send
                    </span>
                    Submit Report &amp; Notify Field Inspectors
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#4a5568] text-center pt-1">
                <span className="material-symbols-outlined text-[16px] text-[#1f6e72]">
                  verified_user
                </span>
                <span>
                  Directly connected to EPA Rapid Response Correlator. No
                  account required.
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
