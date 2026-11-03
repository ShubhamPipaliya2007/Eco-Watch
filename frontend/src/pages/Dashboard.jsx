import React, { useState } from 'react';
import AuthoritySidebar from '../components/AuthoritySidebar';
import AuthorityHeader from '../components/AuthorityHeader';

const INITIAL_COMPLAINTS = [
  {
    id: '#CIT-882',
    name: 'Aarav Sharma',
    phone: '+91 98100 45678',
    email: 'aarav.sharma@outlook.com',
    type: 'Chemical / Acidic Outfall',
    category: 'chemical',
    time: '12 mins ago',
    location: 'Sector 4 Outfall Culvert #12, Old Mill Reach (Statutory Link: WAT-001)',
    statement:
      'Noticed pungent acrid chemical smell near the culvert weir around 07:45 AM. Thick brown discoloration and visible foamy surface plume spanning the entire river channel. Several small fish seen floating dead near the bank. Effluent appears to originate from the northern industrial discharge line upstream.',
    priority: 'Critical P1',
    priorityColor: 'terra',
    status: 'urgent',
    verified: true,
    badge: 'Verified Citizen',
    channel: 'Eco-Watch Citizen Web Portal',
    telemetry: 'Today 08:15 IST (GPS ±2.8m)',
    evidence: [
      {
        title: 'Culvert Outfall Foaming',
        file: 'IMG_202504_0812.jpg (3.4 MB)',
        time: '08:12 IST',
        label: 'OUTLET WEIR #12'
      },
      {
        title: 'Dead Fish / Bio-Impact',
        file: 'IMG_202504_0814.jpg (2.8 MB)',
        time: '08:14 IST',
        label: 'SHORELINE DEBRIS'
      }
    ]
  },
  {
    id: '#CIT-881',
    name: 'Meera Nair',
    phone: 'Hidden (Anonymous)',
    email: 'Hidden (Anonymous)',
    type: 'Sewage Overflow',
    category: 'sewage',
    time: '45 mins ago',
    location: 'South Urban Storm Drain Canal Junction #3 (Near Ward 14 Bridge)',
    statement:
      'Domestic sewage line rupture discharging untreated blackwater directly into the open municipal storm canal. Foul odor spreading into residential streets.',
    priority: 'Elevated',
    priorityColor: 'slate',
    status: 'unassigned',
    verified: false,
    badge: 'Anonymous Citizen Deposition',
    channel: 'Eco-Watch Citizen Web Portal',
    telemetry: 'Today 07:45 IST (GPS ±5.1m)',
    evidence: [
      {
        title: 'Storm Canal Influx',
        file: 'IMG_202504_0746.jpg (1.9 MB)',
        time: '07:46 IST',
        label: 'WARD 14 STORM OUT'
      }
    ]
  },
  {
    id: '#CIT-880',
    name: 'Rahul Verma',
    phone: '+91 98451 22390',
    email: 'r.verma@fishermenguild.org',
    type: 'Fish Kill / Wildlife Bio-Impact',
    category: 'wildlife',
    time: '1 hr ago',
    location: 'East Weir Downstream Reach, Culvert Bend Km 14',
    statement:
      'Observed hundreds of dead carp washed onto the river bank. Water surface has an oily rainbow slick with choking sulfur odors.',
    priority: 'Critical P1',
    priorityColor: 'terra',
    status: 'urgent',
    verified: true,
    badge: 'Local Fishermen Guild',
    channel: 'Direct Hotline Hotline Ingest',
    telemetry: 'Today 07:15 IST (GPS ±3.0m)',
    evidence: [
      {
        title: 'Fish Mortality Cluster',
        file: 'IMG_202504_0718.jpg (4.1 MB)',
        time: '07:18 IST',
        label: 'WEIR BEND KM 14'
      }
    ]
  },
  {
    id: '#CIT-879',
    name: 'Capt. Dennis Cole',
    phone: '+91 97110 88201',
    email: 'd.cole@portauthority.gov',
    type: 'Oil / Diesel Slick',
    category: 'oil',
    time: '2 hrs ago',
    location: 'Terminal Wharf Basin, Commercial Dock Slip #4',
    statement:
      'Light petroleum sheen drifting from moored refueling barge. Absorbent booms deployed locally, requesting statutory compliance review.',
    priority: 'Moderate',
    priorityColor: 'slate',
    status: 'investigation',
    verified: true,
    badge: 'Harbor Patrol Officer',
    channel: 'Maritime Intercom Relay',
    telemetry: 'Today 06:30 IST (GPS ±1.5m)',
    evidence: [
      {
        title: 'Wharf Surface Sheen',
        file: 'IMG_202504_0631.jpg (2.2 MB)',
        time: '06:31 IST',
        label: 'DOCK SLIP #4'
      }
    ]
  }
];

export default function Dashboard({ onNavigate, userSubmissions = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [actionNotice, setActionNotice] = useState(null);

  // Combine initial complaints with any dynamic user submissions
  const dynamicComplaints = userSubmissions.map((sub, idx) => ({
    id: `#CIT-${900 + idx}`,
    name: sub.isAnonymous ? 'Anonymous Citizen' : 'Citizen Submitter',
    phone: sub.phone || '+91 98100 45678',
    email: sub.email || 'citizen@ecowatch.org',
    type: sub.title || 'Water Contamination Incident',
    category: sub.category || 'chemical',
    time: 'Just now',
    location: sub.location || 'Reported River Basin Location',
    statement: sub.description || 'Observed hazardous water pollution in public reach.',
    priority: sub.backendAnalysis?.severity ? `${sub.backendAnalysis.severity} P1` : 'Critical P1',
    priorityColor: 'terra',
    status: 'urgent',
    verified: !sub.isAnonymous,
    badge: sub.isAnonymous ? 'Anonymous Deposition' : 'Verified Web Ingest',
    channel: 'Eco-Watch Citizen Web Portal',
    telemetry: `Today ${sub.submittedAt || 'Just now'} (GPS Acquired)`,
    evidence: [
      {
        title: 'Evidence Media Intake',
        file: 'Citizen_Upload_01.jpg (2.4 MB)',
        time: sub.submittedAt || '10:00 IST',
        label: 'FIELD DEPOSITION'
      }
    ]
  }));

  const allComplaints = [...dynamicComplaints, ...INITIAL_COMPLAINTS];
  const [selectedId, setSelectedId] = useState(allComplaints[0]?.id || '#CIT-882');

  const filteredComplaints = allComplaints.filter((item) => {
    // Filter by tab
    if (filterTab === 'unassigned' && item.status !== 'unassigned') return false;
    if (filterTab === 'urgent' && item.status !== 'urgent') return false;
    if (filterTab === 'investigation' && item.status !== 'investigation') return false;
    if (filterTab === 'resolved' && item.status !== 'resolved') return false;

    // Filter by search term
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const selectedComplaint = allComplaints.find((c) => c.id === selectedId) || allComplaints[0];

  const handleTriggerAction = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  return (
    <div className="bg-sand-100 font-sans text-slate-850 antialiased min-h-screen">
      <AuthoritySidebar onNavigate={onNavigate} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="pl-72">
        <AuthorityHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <main className="relative pt-16 bg-sand-100 min-h-screen">
          <div className="px-8 py-8 flex flex-col gap-6 max-w-[1600px] mx-auto">
            {/* Action notification toast */}
            {actionNotice && (
              <div className="p-3 bg-teal-brand text-white text-xs font-semibold rounded flex items-center justify-between shadow-md animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">task_alt</span>
                  <span>{actionNotice}</span>
                </div>
                <button onClick={() => setActionNotice(null)} className="text-white/80 hover:text-white">
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}

            {/* Header & Quick Actions */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-slate-600 mb-1 text-xs">
                    <span className="material-symbols-outlined text-[16px] text-teal-brand">verified_user</span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-slate-600 font-semibold">
                      Statutory EPA Command • Citizen Deposition Desk
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Citizen Complaints &amp; Environmental Triage Command
                  </h1>
                  <p className="text-xs text-slate-600 mt-1">
                    Review, corroborate with buoy telemetry, and dispatch field inspectors for verified public contamination depositions.
                  </p>
                </div>
                <div className="flex items-center gap-3 self-start lg:self-auto">
                  <button
                    onClick={() => handleTriggerAction('Registry Log exported as encrypted EPA-audit.csv')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-sand-200 text-slate-800 rounded border border-sand-border shadow-xs text-xs font-semibold transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[17px] text-slate-600">download</span>
                    Export Registry Log
                  </button>
                  <button
                    onClick={() => handleTriggerAction('Fast-Response Unit 4 dispatched to Sector 4 Weir.')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-brand hover:bg-teal-brandHover text-white rounded shadow-xs text-xs font-semibold transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[17px]">add_alert</span>
                    Dispatch Fast-Response Unit
                  </button>
                </div>
              </div>

              {/* Live Status & Filter Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-white rounded border border-sand-border">
                <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-teal-brand">pin_drop</span>
                    <span className="text-slate-500">Jurisdiction:</span>
                    <span className="font-semibold text-slate-850">Northern River Basin Sector IV (Urban &amp; Industrial)</span>
                  </div>
                  <span className="text-sand-border hidden sm:inline">|</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-brand animate-ping"></span>
                    <span className="text-slate-500">Public Hotline Ingest:</span>
                    <span className="font-semibold text-slate-850">Active &amp; Listening</span>
                  </div>
                  <span className="text-sand-border hidden sm:inline">|</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-slate-500">sync</span>
                    <span className="text-slate-500">Buoy Cross-Validation:</span>
                    <span className="font-mono font-medium text-slate-700">Automated Correlator Active</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-teal-light border border-teal-border rounded text-teal-brand text-xs font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">cell_tower</span>{' '}
                    {allComplaints.length + 20} Citizen Reports In Cycle
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Citizen-Focused Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="bg-white p-5 rounded border border-sand-border flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Incoming Citizen Reports</span>
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-3xl font-bold text-slate-900">{allComplaints.length + 14}</span>
                      <span className="inline-flex items-center text-teal-brand text-xs font-semibold">
                        ▲ +{allComplaints.length} in last 2h
                      </span>
                    </div>
                  </div>
                  <span className="p-2.5 bg-sand-200 border border-sand-border text-slate-700 rounded">
                    <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
                  </span>
                </div>
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-sand-border text-xs">
                  <span className="text-slate-500">Total logged this week</span>
                  <span className="px-2 py-0.5 bg-sand-200 text-slate-700 rounded font-mono font-medium text-[11px]">
                    74 total
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-5 rounded border border-sand-border flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Unassigned Complaints</span>
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-3xl font-bold text-slate-900">5</span>
                      <span className="inline-flex items-center text-slate-600 text-xs font-medium">
                        Pending Triage
                      </span>
                    </div>
                  </div>
                  <span className="p-2.5 bg-sand-200 border border-sand-border text-slate-700 rounded">
                    <span className="material-symbols-outlined text-[20px]">pending_actions</span>
                  </span>
                </div>
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-sand-border text-xs">
                  <span className="text-slate-500">Oldest unreviewed queue</span>
                  <span className="px-2 py-0.5 bg-sand-200 text-slate-700 rounded font-mono font-medium text-[11px]">
                    42m waiting
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-5 rounded border border-sand-border flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Critical Contamination Alerts</span>
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-3xl font-bold text-terra-text">3</span>
                      <span className="w-2 h-2 rounded-full bg-terra-solid"></span>
                    </div>
                  </div>
                  <span className="p-2.5 bg-terra-subtle border border-terra-border text-terra-text rounded">
                    <span className="material-symbols-outlined text-[20px]">emergency</span>
                  </span>
                </div>
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-sand-border text-xs">
                  <span className="text-slate-500">Sensor Buoy Corroborated</span>
                  <span className="px-2 py-0.5 bg-terra-subtle border border-terra-border text-terra-text rounded font-mono font-bold text-[11px]">
                    Urgent P1
                  </span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-5 rounded border border-sand-border flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Avg. Response Time</span>
                    <div className="flex items-baseline gap-1.5 mt-1.5">
                      <span className="text-3xl font-bold text-slate-900">28</span>
                      <span className="text-xs text-slate-500 font-normal">mins</span>
                      <span className="text-teal-brand text-xs font-semibold ml-1">-14m faster</span>
                    </div>
                  </div>
                  <span className="p-2.5 bg-sand-200 border border-sand-border text-slate-700 rounded">
                    <span className="material-symbols-outlined text-[20px]">speed</span>
                  </span>
                </div>
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-sand-border text-xs">
                  <span className="text-slate-500">SLA statutory target: &lt; 60m</span>
                  <span className="px-2 py-0.5 bg-teal-light text-teal-brand border border-teal-border rounded font-mono font-semibold text-[11px]">
                    96.4% Met
                  </span>
                </div>
              </div>
            </div>

            {/* Split Master-Detail Workspace */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* Left Column: Complaints Feed & Explorer (7 Cols) */}
              <div className="xl:col-span-7 bg-white rounded border border-sand-border flex flex-col">
                {/* Filter Toolbar */}
                <div className="p-4 border-b border-sand-border flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-teal-brand text-[22px]">fact_check</span>
                      <div>
                        <h2 className="text-base font-bold text-slate-900">Citizen Complaints &amp; Field Reports</h2>
                        <p className="text-xs text-slate-500">
                          Select any public complaint to examine complainant deposition, geotags, and photographic evidence
                        </p>
                      </div>
                    </div>
                    {/* Search */}
                    <div className="relative min-w-[200px]">
                      <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[16px]">
                        search
                      </span>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search complainant, ref, canal..."
                        className="w-full pl-8 pr-3 py-1.5 bg-sand-100 text-slate-800 placeholder:text-slate-400 text-xs rounded border border-sand-border focus:outline-none focus:border-teal-brand focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5">
                    {[
                      { id: 'all', label: 'All Complaints', count: allComplaints.length + 20 },
                      { id: 'unassigned', label: 'Unassigned', count: 5 },
                      { id: 'urgent', label: 'Urgent / Severe', count: 3, alert: true },
                      { id: 'investigation', label: 'Under Investigation', count: 11 },
                      { id: 'resolved', label: 'Resolved', count: 5 }
                    ].map((tab) => {
                      const isActive = filterTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setFilterTab(tab.id)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-teal-brand text-white shadow-xs'
                              : tab.alert
                              ? 'bg-sand-100 hover:bg-terra-subtle text-slate-700 hover:text-terra-text border border-sand-border'
                              : 'bg-sand-100 hover:bg-sand-200 text-slate-700 border border-sand-border'
                          }`}
                        >
                          {tab.label}
                          <span
                            className={`px-1.5 py-0.2 rounded font-mono text-[10px] ${
                              isActive
                                ? 'bg-white/20'
                                : tab.alert
                                ? 'bg-terra-subtle border border-terra-border text-terra-text font-bold'
                                : 'bg-sand-200 text-slate-700'
                            }`}
                          >
                            {tab.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Complaints List */}
                <div className="flex flex-col divide-y divide-sand-border max-h-[660px] overflow-y-auto">
                  {filteredComplaints.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs">
                      No complaints match the current filter or search criteria.
                    </div>
                  ) : (
                    filteredComplaints.map((item) => {
                      const isSelected = item.id === selectedComplaint.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedId(item.id)}
                          className={`p-4 transition-colors cursor-pointer flex flex-col gap-2 ${
                            isSelected
                              ? 'bg-teal-light/50 border-l-4 border-l-teal-brand hover:bg-teal-light'
                              : 'bg-white hover:bg-sand-100'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`px-2 py-0.5 rounded font-mono text-xs ${
                                  isSelected ? 'font-bold bg-slate-850 text-white' : 'font-semibold bg-sand-200 text-slate-800'
                                }`}
                              >
                                {item.id}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1 ${
                                  item.priority.includes('Critical')
                                    ? 'border border-terra-border bg-terra-subtle text-terra-text'
                                    : 'border border-sand-border bg-sand-200 text-slate-700'
                                }`}
                              >
                                {item.priority.includes('Critical') && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-terra-solid"></span>
                                )}
                                {item.priority}
                              </span>
                              <span className="px-2 py-0.5 bg-white border border-sand-border text-slate-700 text-xs font-medium rounded flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px] text-teal-brand">
                                  {item.category === 'chemical' ? 'science' : item.category === 'sewage' ? 'water_damage' : 'warning'}
                                </span>
                                {item.type}
                              </span>
                            </div>
                            <span
                              className={`text-xs font-mono flex items-center gap-1 ${
                                item.priority.includes('Critical') ? 'text-terra-text font-semibold' : 'text-slate-500'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[14px]">schedule</span> {item.time}
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-900">{item.name}</span>
                                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-white border border-sand-border text-slate-700 rounded text-[11px] font-medium">
                                  {item.verified && (
                                    <span className="material-symbols-outlined text-[13px] text-teal-brand">verified</span>
                                  )}
                                  {item.badge}
                                </span>
                                <span className="text-xs font-mono text-slate-500">{item.phone}</span>
                              </div>
                              <div className="flex items-center gap-1 text-slate-600 text-xs mt-0.5">
                                <span className="material-symbols-outlined text-[15px] text-slate-400">pin_drop</span>
                                <span className="truncate">{item.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 self-end sm:self-auto">
                              {isSelected ? (
                                <span className="px-2.5 py-1 bg-white border border-teal-border text-teal-brand rounded text-xs font-semibold flex items-center gap-1 shadow-xs">
                                  <span className="material-symbols-outlined text-[14px]">visibility</span> Viewing Dossier
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 bg-sand-100 hover:bg-sand-200 border border-sand-border rounded text-xs font-semibold text-slate-700 transition-colors">
                                  Inspect Details
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-slate-700 bg-white p-2.5 rounded border border-sand-border italic truncate">
                            "{item.statement}"
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Bottom Pagination */}
                <div className="p-3 px-4 bg-sand-100 border-t border-sand-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                  <span>
                    Showing {filteredComplaints.length} of {allComplaints.length + 20} citizen depositions
                  </span>
                  <div className="flex items-center gap-1">
                    <button className="px-2.5 py-1 rounded bg-white text-slate-500 border border-sand-border hover:bg-sand-200 transition-colors disabled:opacity-40" disabled>
                      Previous
                    </button>
                    <button className="px-2.5 py-1 rounded bg-teal-brand text-white font-semibold">1</button>
                    <button className="px-2.5 py-1 rounded bg-white text-slate-700 border border-sand-border hover:bg-sand-200 transition-colors">2</button>
                    <button className="px-2.5 py-1 rounded bg-white text-slate-700 border border-sand-border hover:bg-sand-200 transition-colors">3</button>
                    <button className="px-2.5 py-1 rounded bg-white text-slate-700 border border-sand-border hover:bg-sand-200 transition-colors">Next</button>
                  </div>
                </div>
              </div>

              {/* Right Column: Dedicated Inspection View & Complainant Dossier (5 Cols) */}
              <div className="xl:col-span-5 bg-white rounded border border-sand-border p-5 flex flex-col gap-4">
                {/* Dossier Header */}
                <div className="flex items-start justify-between border-b border-sand-border pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-teal-brand text-[20px]">badge</span>
                      <h3 className="text-base font-bold text-slate-900">Complainant Dossier</h3>
                    </div>
                    <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">
                      Ticket {selectedComplaint.id} • Statutory Case WAT-001
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-terra-subtle border border-terra-border text-terra-text rounded text-xs font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-terra-solid"></span> High Priority
                  </span>
                </div>

                {/* Profile */}
                <div className="bg-sand-100 rounded p-4 flex flex-col gap-3 border border-sand-border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded bg-slate-850 text-white flex items-center justify-center font-bold text-sm">
                        {selectedComplaint.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-slate-900">{selectedComplaint.name}</span>
                          {selectedComplaint.verified && (
                            <span className="material-symbols-outlined text-[16px] text-teal-brand" title="Identity Verified">
                              verified
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500">{selectedComplaint.badge}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-white border border-sand-border text-slate-700 rounded font-mono text-[10px] font-semibold">
                      Live Deposition
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-sand-border text-xs">
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-slate-500 uppercase">Direct Phone</span>
                      <span className="font-semibold text-slate-850 font-mono mt-0.5">{selectedComplaint.phone}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-slate-500 uppercase">Email Contact</span>
                      <span className="font-semibold text-slate-850 truncate mt-0.5">{selectedComplaint.email}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-slate-500 uppercase">Submission Channel</span>
                      <span className="text-slate-700 mt-0.5">{selectedComplaint.channel}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-slate-500 uppercase">Epoch &amp; Telemetry</span>
                      <span className="text-slate-700 mt-0.5">{selectedComplaint.telemetry}</span>
                    </div>
                  </div>
                </div>

                {/* Statement */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-teal-brand">format_quote</span>
                    Complainant Deposition Statement
                  </label>
                  <div className="bg-sand-100 rounded p-3 text-slate-800 text-xs leading-relaxed border-l-4 border-l-slate-700 border border-sand-border">
                    "{selectedComplaint.statement}"
                  </div>
                </div>

                {/* Photographic Evidence SVGs */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-slate-600">photo_library</span> Attached
                      Evidence Media ({selectedComplaint.evidence?.length || 2} Files)
                    </label>
                    <span className="text-[11px] text-teal-brand font-semibold">EXIF Geotag Validated</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Visual Card 1 */}
                    <div className="bg-sand-100 rounded overflow-hidden border border-sand-border flex flex-col group">
                      <div className="h-24 w-full bg-sand-200 relative overflow-hidden flex items-center justify-center">
                        <svg className="w-full h-full object-cover" fill="none" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                          <rect fill="#EAE3D9" height="120" width="200"></rect>
                          <path d="M0 80 Q 50 60 100 75 T 200 70 L 200 120 L 0 120 Z" fill="#8C3322" opacity="0.4"></path>
                          <path d="M20 50 Q 80 40 140 60 T 200 55" fill="none" stroke="#1F6E72" strokeWidth="4"></path>
                          <circle cx="140" cy="65" fill="#FFFFFF" opacity="0.8" r="14"></circle>
                          <circle cx="155" cy="60" fill="#F3EEE7" opacity="0.9" r="7"></circle>
                          <text fill="#1E293B" fontFamily="sans-serif" fontSize="9" fontWeight="bold" x="10" y="20">
                            {selectedComplaint.evidence?.[0]?.label || 'OUTLET WEIR #12'}
                          </text>
                        </svg>
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-slate-900/80 text-white rounded text-[10px] font-mono">
                          {selectedComplaint.evidence?.[0]?.time || '08:12 IST'}
                        </span>
                      </div>
                      <div className="p-2 bg-white flex items-center justify-between border-t border-sand-border">
                        <div className="truncate">
                          <span className="block text-xs font-semibold text-slate-900 truncate">
                            {selectedComplaint.evidence?.[0]?.title || 'Culvert Outfall Foaming'}
                          </span>
                          <span className="block text-[10px] font-mono text-slate-500">
                            {selectedComplaint.evidence?.[0]?.file || 'IMG_202504_0812.jpg (3.4 MB)'}
                          </span>
                        </div>
                        <button className="p-1 text-slate-500 hover:text-slate-900 rounded" title="Inspect Full Res" type="button">
                          <span className="material-symbols-outlined text-[16px]">open_in_full</span>
                        </button>
                      </div>
                    </div>

                    {/* Visual Card 2 */}
                    <div className="bg-sand-100 rounded overflow-hidden border border-sand-border flex flex-col group">
                      <div className="h-24 w-full bg-sand-200 relative overflow-hidden flex items-center justify-center">
                        <svg className="w-full h-full object-cover" fill="none" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                          <rect fill="#F3EEE7" height="120" width="200"></rect>
                          <path d="M0 40 C 60 70 120 30 200 60 L 200 120 L 0 120 Z" fill="#1F6E72" opacity="0.25"></path>
                          <ellipse cx="80" cy="85" fill="#FFFFFF" rx="14" ry="6" stroke="#8C3322" strokeWidth="1.2"></ellipse>
                          <ellipse cx="120" cy="92" fill="#FFFFFF" rx="12" ry="5" stroke="#8C3322" strokeWidth="1.2"></ellipse>
                          <ellipse cx="150" cy="80" fill="#FFFFFF" rx="16" ry="7" stroke="#8C3322" strokeWidth="1.2"></ellipse>
                          <text fill="#1E293B" fontFamily="sans-serif" fontSize="9" fontWeight="bold" x="10" y="20">
                            {selectedComplaint.evidence?.[1]?.label || 'SHORELINE DEBRIS'}
                          </text>
                        </svg>
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-slate-900/80 text-white rounded text-[10px] font-mono">
                          {selectedComplaint.evidence?.[1]?.time || '08:14 IST'}
                        </span>
                      </div>
                      <div className="p-2 bg-white flex items-center justify-between border-t border-sand-border">
                        <div className="truncate">
                          <span className="block text-xs font-semibold text-slate-900 truncate">
                            {selectedComplaint.evidence?.[1]?.title || 'Dead Fish / Bio-Impact'}
                          </span>
                          <span className="block text-[10px] font-mono text-slate-500">
                            {selectedComplaint.evidence?.[1]?.file || 'IMG_202504_0814.jpg (2.8 MB)'}
                          </span>
                        </div>
                        <button className="p-1 text-slate-500 hover:text-slate-900 rounded" title="Inspect Full Res" type="button">
                          <span className="material-symbols-outlined text-[16px]">open_in_full</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buoy Telemetry Cross-Validation */}
                <div className="p-3 bg-terra-subtle rounded border border-terra-border flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-terra-text flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">sensors</span> AI Cross-Validation: Buoy N-042 Corroborated
                    </span>
                    <span className="px-2 py-0.5 bg-white border border-terra-border text-terra-text rounded font-mono text-[10px] font-bold">
                      98% Confidence
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-normal">
                    Automated analysis confirms rapid drop in pH (5.2) and acute Dissolved Oxygen crash (3.2 mg/L) detected 400m downstream within 18 minutes of reported timestamp.
                  </p>
                </div>

                {/* Authority Action Suite */}
                <div className="pt-2 flex flex-col gap-2.5 border-t border-sand-border">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Authority Action Suite
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleTriggerAction(`Field crew assigned to ticket ${selectedComplaint.id}`)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-teal-brand hover:bg-teal-brandHover text-white rounded text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[17px]">assignment_ind</span>
                      Assign Field Crew
                    </button>
                    <button
                      onClick={() => handleTriggerAction(`Containment order enacted for reach ${selectedComplaint.location}`)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-terra-solid hover:opacity-95 text-white rounded text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[17px]">block</span>
                      Containment Order
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleTriggerAction(`Linked ${selectedComplaint.id} to Statutory Case WAT-001`)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-sand-100 hover:bg-sand-200 border border-sand-border text-slate-800 rounded text-xs font-medium transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px] text-slate-500">link</span> Link to Case WAT-001
                    </button>
                    <button
                      onClick={() => handleTriggerAction(`SMS progress update dispatched to ${selectedComplaint.phone}`)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-sand-100 hover:bg-sand-200 border border-sand-border text-slate-800 rounded text-xs font-medium transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px] text-slate-500">sms</span> Send SMS Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

