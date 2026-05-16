import { useState, useEffect, useRef } from "react";

// ── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_BOOKS = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0-7432-7356-5", category: "Fiction", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&q=80", stock: 5, available: 3, rating: 4.5, year: 1925, description: "A story of the mysteriously wealthy Jay Gatsby." },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0-06-112008-4", category: "Fiction", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=120&q=80", stock: 4, available: 4, rating: 4.8, year: 1960, description: "A classic of modern American literature." },
  { id: 3, title: "1984", author: "George Orwell", isbn: "978-0-452-28423-4", category: "Dystopia", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=120&q=80", stock: 6, available: 2, rating: 4.7, year: 1949, description: "A dystopian social science fiction novel." },
  { id: 4, title: "Sapiens", author: "Yuval Noah Harari", isbn: "978-0-06-231609-7", category: "Non-Fiction", cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=120&q=80", stock: 3, available: 1, rating: 4.6, year: 2011, description: "A brief history of humankind." },
  { id: 5, title: "The Alchemist", author: "Paulo Coelho", isbn: "978-0-06-231500-7", category: "Fiction", cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=120&q=80", stock: 8, available: 5, rating: 4.3, year: 1988, description: "A philosophical novel about following your dreams." },
  { id: 6, title: "Educated", author: "Tara Westover", isbn: "978-0-399-59050-4", category: "Memoir", cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=120&q=80", stock: 4, available: 4, rating: 4.7, year: 2018, description: "A memoir of self-invention and family loyalty." },
  { id: 7, title: "Atomic Habits", author: "James Clear", isbn: "978-0-7352-1129-2", category: "Self-Help", cover: "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?w=120&q=80", stock: 7, available: 6, rating: 4.9, year: 2018, description: "Tiny changes, remarkable results." },
  { id: 8, title: "Dune", author: "Frank Herbert", isbn: "978-0-441-17271-9", category: "Sci-Fi", cover: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=120&q=80", stock: 5, available: 3, rating: 4.6, year: 1965, description: "The greatest science fiction novel of all time." },
];

const MOCK_STUDENTS = [
  { id: 1, name: "Aisha Rahman", studentId: "STU-2024-001", grade: "11A", email: "aisha@school.edu", borrowed: 2, status: "active", avatar: "AR" },
  { id: 2, name: "Budi Santoso", studentId: "STU-2024-002", grade: "10B", email: "budi@school.edu", borrowed: 1, status: "active", avatar: "BS" },
  { id: 3, name: "Citra Dewi", studentId: "STU-2024-003", grade: "12A", email: "citra@school.edu", borrowed: 0, status: "active", avatar: "CD" },
  { id: 4, name: "Dani Wijaya", studentId: "STU-2024-004", grade: "10A", email: "dani@school.edu", borrowed: 3, status: "overdue", avatar: "DW" },
  { id: 5, name: "Eka Putri", studentId: "STU-2024-005", grade: "11B", email: "eka@school.edu", borrowed: 1, status: "active", avatar: "EP" },
];

const MOCK_BORROWS = [
  { id: 1, studentName: "Aisha Rahman", bookTitle: "The Great Gatsby", borrowDate: "2025-05-01", dueDate: "2025-05-15", status: "active", fine: 0 },
  { id: 2, studentName: "Budi Santoso", bookTitle: "Sapiens", borrowDate: "2025-04-28", dueDate: "2025-05-12", status: "overdue", fine: 4000 },
  { id: 3, studentName: "Dani Wijaya", bookTitle: "1984", borrowDate: "2025-05-05", dueDate: "2025-05-19", status: "active", fine: 0 },
  { id: 4, studentName: "Eka Putri", bookTitle: "Atomic Habits", borrowDate: "2025-05-10", dueDate: "2025-05-24", status: "active", fine: 0 },
  { id: 5, studentName: "Citra Dewi", bookTitle: "Dune", borrowDate: "2025-04-20", dueDate: "2025-05-04", status: "returned", fine: 0 },
];

const ACTIVITIES = [
  { id: 1, type: "borrow", text: "Aisha Rahman borrowed The Great Gatsby", time: "2 hours ago", icon: "📚" },
  { id: 2, type: "return", text: "Citra Dewi returned Dune", time: "5 hours ago", icon: "✅" },
  { id: 3, type: "new", text: "New book added: Atomic Habits", time: "1 day ago", icon: "➕" },
  { id: 4, type: "overdue", text: "Budi Santoso has an overdue book", time: "2 days ago", icon: "⚠️" },
  { id: 5, type: "register", text: "New student registered: Eka Putri", time: "3 days ago", icon: "👤" },
];

const CATEGORIES = ["All", "Fiction", "Non-Fiction", "Dystopia", "Sci-Fi", "Memoir", "Self-Help"];

// ── COLOR PALETTE ────────────────────────────────────────────────────────────
const colors = {
  navy: "#0f2554",
  blue: "#1a3a8f",
  blue2: "#2563eb",
  blue3: "#3b82f6",
  blueLight: "#dbeafe",
  blueSoft: "#eff6ff",
  white: "#ffffff",
  gray50: "#f8fafc",
  gray100: "#f1f5f9",
  gray200: "#e2e8f0",
  gray300: "#cbd5e1",
  gray500: "#64748b",
  gray600: "#475569",
  gray700: "#334155",
  gray800: "#1e293b",
  gray900: "#0f172a",
  green: "#059669",
  greenLight: "#d1fae5",
  amber: "#d97706",
  amberLight: "#fef3c7",
  red: "#dc2626",
  redLight: "#fee2e2",
};

// ── SHARED STYLES ────────────────────────────────────────────────────────────
const css = {
  sidebar: {
    width: 240,
    minHeight: "100vh",
    background: `linear-gradient(180deg, ${colors.navy} 0%, ${colors.blue} 100%)`,
    display: "flex",
    flexDirection: "column",
    padding: "0 0 24px",
    flexShrink: 0,
    position: "relative",
  },
  main: {
    flex: 1,
    background: colors.gray50,
    minHeight: "100vh",
    overflow: "auto",
  },
  card: {
    background: colors.white,
    borderRadius: 12,
    border: `1px solid ${colors.gray200}`,
    padding: "20px 24px",
  },
  badge: (color, bg) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "3px 10px",
    borderRadius: 99,
    fontSize: 12,
    fontWeight: 600,
    color,
    background: bg,
  }),
  btn: (variant = "primary") => {
    const map = {
      primary: { background: colors.blue2, color: "#fff", border: "none" },
      secondary: { background: colors.white, color: colors.blue2, border: `1.5px solid ${colors.blue2}` },
      ghost: { background: "transparent", color: colors.gray600, border: `1px solid ${colors.gray200}` },
      danger: { background: colors.redLight, color: colors.red, border: "none" },
    };
    return {
      ...map[variant],
      padding: "8px 18px",
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      transition: "all 0.18s ease",
      whiteSpace: "nowrap",
    };
  },
  input: {
    width: "100%",
    padding: "9px 13px",
    borderRadius: 8,
    border: `1.5px solid ${colors.gray200}`,
    fontSize: 14,
    color: colors.gray800,
    background: colors.white,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.gray600,
    marginBottom: 6,
    display: "block",
  },
};

// ── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, color, bg }) {
  return (
    <div style={{ ...css.card, display: "flex", alignItems: "center", gap: 16, transition: "box-shadow 0.2s" }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 13, color: colors.gray500, fontWeight: 500, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: colors.gray900, lineHeight: 1.1 }}>{value}</div>
        {sub && <div style={{ fontSize: 12, color: colors.gray500, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

// ── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, background: colors.gray800, color: "#fff", padding: "12px 20px", borderRadius: 10, fontSize: 14, fontWeight: 500, zIndex: 9999, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", gap: 10, maxWidth: 360 }}>
      <span>✓</span>{msg}
      <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", marginLeft: 8, opacity: 0.7, fontSize: 16 }}>×</button>
    </div>
  );
}

// ── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, wide }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,37,84,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
      <div style={{ background: colors.white, borderRadius: 16, width: "100%", maxWidth: wide ? 680 : 480, maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${colors.gray200}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: colors.gray900 }}>{title}</div>
          <button onClick={onClose} style={{ background: colors.gray100, border: "none", width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 18, color: colors.gray500, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>
        <div style={{ padding: "24px" }}>{children}</div>
      </div>
    </div>
  );
}

// ── SIDEBAR NAV ──────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "books", label: "Book Management", icon: "📚" },
  { id: "borrow", label: "Borrowing", icon: "🔄" },
  { id: "students", label: "Students", icon: "👥" },
  { id: "digital", label: "Digital Library", icon: "💻" },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

function Sidebar({ active, setActive, role }) {
  return (
    <div style={css.sidebar}>
      {/* Logo */}
      <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📖</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, letterSpacing: 0.5 }}>LibraryHub</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>School Edition</div>
          </div>
        </div>
      </div>
      {/* Role badge */}
      <div style={{ padding: "12px 20px" }}>
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12 }}>👤</span>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 600 }}>{role === "admin" ? "Administrator" : role === "librarian" ? "Librarian" : "Student"}</span>
        </div>
      </div>
      {/* Nav */}
      <nav style={{ flex: 1, padding: "8px 12px" }}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 9,
              border: "none",
              background: active === item.id ? "rgba(255,255,255,0.15)" : "transparent",
              color: active === item.id ? "#fff" : "rgba(255,255,255,0.6)",
              fontSize: 14,
              fontWeight: active === item.id ? 700 : 400,
              cursor: "pointer",
              textAlign: "left",
              marginBottom: 2,
              transition: "all 0.15s",
              borderLeft: active === item.id ? "3px solid rgba(255,255,255,0.8)" : "3px solid transparent",
            }}
          >
            <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      {/* User */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#fff" }}>AD</div>
          <div>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Admin User</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>admin@school.edu</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TOPBAR ───────────────────────────────────────────────────────────────────
function Topbar({ page, darkMode, setDarkMode, showToast }) {
  const [notifOpen, setNotifOpen] = useState(false);
  return (
    <div style={{ background: colors.white, borderBottom: `1px solid ${colors.gray200}`, padding: "12px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
      <div>
        <div style={{ fontSize: 20, fontWeight: 800, color: colors.gray900 }}>{NAV_ITEMS.find(n => n.id === page)?.label || "Dashboard"}</div>
        <div style={{ fontSize: 12, color: colors.gray500 }}>School Library Management System</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <input placeholder="Quick search..." style={{ ...css.input, width: 200, paddingLeft: 32, background: colors.gray50 }} />
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: colors.gray400, fontSize: 15 }}>🔍</span>
        </div>
        {/* Dark mode toggle */}
        <button onClick={() => { setDarkMode(!darkMode); showToast(`${!darkMode ? "Dark" : "Light"} mode (UI preview only)`); }}
          style={{ ...css.btn("ghost"), padding: "8px 10px" }}>
          {darkMode ? "☀️" : "🌙"}
        </button>
        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setNotifOpen(!notifOpen)} style={{ ...css.btn("ghost"), padding: "8px 10px", position: "relative" }}>
            🔔
            <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: colors.red, borderRadius: "50%", border: "2px solid #fff" }} />
          </button>
          {notifOpen && (
            <div style={{ position: "absolute", right: 0, top: 44, width: 300, background: colors.white, borderRadius: 12, border: `1px solid ${colors.gray200}`, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 200, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", fontWeight: 700, fontSize: 14, borderBottom: `1px solid ${colors.gray100}` }}>Notifications</div>
              {ACTIVITIES.slice(0, 4).map(a => (
                <div key={a.id} style={{ padding: "10px 16px", borderBottom: `1px solid ${colors.gray100}`, fontSize: 13, color: colors.gray700, display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 16 }}>{a.icon}</span>
                  <div><div>{a.text}</div><div style={{ fontSize: 11, color: colors.gray400, marginTop: 2 }}>{a.time}</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD PAGE ───────────────────────────────────────────────────────────
function DashboardPage({ showToast }) {
  const totalBooks = MOCK_BOOKS.reduce((s, b) => s + b.stock, 0);
  const borrowed = MOCK_BOOKS.reduce((s, b) => s + (b.stock - b.available), 0);
  const available = MOCK_BOOKS.reduce((s, b) => s + b.available, 0);

  // Simple bar chart using divs
  const chartData = [
    { label: "Mon", borrow: 12, return: 8 },
    { label: "Tue", borrow: 19, return: 14 },
    { label: "Wed", borrow: 8, return: 11 },
    { label: "Thu", borrow: 24, return: 18 },
    { label: "Fri", borrow: 15, return: 20 },
    { label: "Sat", borrow: 6, return: 4 },
  ];
  const maxVal = Math.max(...chartData.map(d => Math.max(d.borrow, d.return)));

  return (
    <div style={{ padding: "28px" }}>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Books" value={totalBooks} sub="Across all categories" icon="📚" color={colors.blue2} bg={colors.blueLight} />
        <StatCard label="Borrowed" value={borrowed} sub="Currently out" icon="🔄" color={colors.amber} bg={colors.amberLight} />
        <StatCard label="Available" value={available} sub="Ready to borrow" icon="✅" color={colors.green} bg={colors.greenLight} />
        <StatCard label="Active Students" value={MOCK_STUDENTS.length} sub="Registered members" icon="👥" color={colors.blue2} bg="#ede9fe" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Chart */}
        <div style={css.card}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: colors.gray900 }}>Weekly Activity</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 20 }}>Borrowing vs Returns this week</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160 }}>
            {chartData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}>
                <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end", gap: 3 }}>
                  <div style={{ flex: 1, background: colors.blue2, borderRadius: "4px 4px 0 0", height: `${(d.borrow / maxVal) * 100}%`, minHeight: 4, transition: "height 0.5s" }} />
                  <div style={{ flex: 1, background: colors.blueLight, borderRadius: "4px 4px 0 0", height: `${(d.return / maxVal) * 100}%`, minHeight: 4, transition: "height 0.5s" }} />
                </div>
                <div style={{ fontSize: 11, color: colors.gray500 }}>{d.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: colors.gray500 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: colors.blue2 }} /> Borrowed
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: colors.gray500 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: colors.blueLight }} /> Returned
            </div>
          </div>
        </div>

        {/* Category donut (simplified) */}
        <div style={css.card}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: colors.gray900 }}>By Category</div>
          {["Fiction", "Non-Fiction", "Sci-Fi", "Memoir", "Self-Help"].map((cat, i) => {
            const pcts = [38, 22, 18, 12, 10];
            const clrs = [colors.blue2, colors.green, colors.amber, "#8b5cf6", "#ec4899"];
            return (
              <div key={cat} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                  <span style={{ color: colors.gray700 }}>{cat}</span>
                  <span style={{ color: colors.gray500, fontWeight: 600 }}>{pcts[i]}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 99, background: colors.gray100 }}>
                  <div style={{ height: "100%", width: `${pcts[i]}%`, borderRadius: 99, background: clrs[i] }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Recent Activity */}
        <div style={css.card}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: colors.gray900 }}>Recent Activity</div>
          {ACTIVITIES.map(a => (
            <div key={a.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: `1px solid ${colors.gray100}` }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: colors.gray100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: colors.gray700 }}>{a.text}</div>
                <div style={{ fontSize: 11, color: colors.gray400, marginTop: 2 }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Overdue / Quick actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={css.card}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: colors.gray900 }}>Overdue Books ⚠️</div>
            {MOCK_BORROWS.filter(b => b.status === "overdue").map(b => (
              <div key={b.id} style={{ padding: "10px 12px", background: colors.redLight, borderRadius: 8, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: colors.red }}>{b.bookTitle}</div>
                  <div style={{ fontSize: 12, color: "#991b1b" }}>{b.studentName} · Due {b.dueDate}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: colors.red }}>Rp {b.fine.toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div style={css.card}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: colors.gray900 }}>Quick Actions</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[["📚 Add Book", ""], ["🔄 New Borrow", ""], ["👤 Add Student", ""], ["📊 Export Data", ""]].map(([label], i) => (
                <button key={i} onClick={() => showToast(`${label} clicked`)} style={{ ...css.btn("ghost"), justifyContent: "center", padding: "10px 8px", fontSize: 13, background: colors.gray50 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── BOOKS PAGE ───────────────────────────────────────────────────────────────
function BooksPage({ showToast }) {
  const [books, setBooks] = useState(MOCK_BOOKS);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [form, setForm] = useState({ title: "", author: "", isbn: "", category: "Fiction", stock: 1 });
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const filtered = books.filter(b =>
    (cat === "All" || b.category === cat) &&
    (b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()))
  );
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  function openAdd() { setEditBook(null); setForm({ title: "", author: "", isbn: "", category: "Fiction", stock: 1 }); setShowModal(true); }
  function openEdit(b) { setEditBook(b); setForm({ title: b.title, author: b.author, isbn: b.isbn, category: b.category, stock: b.stock }); setShowModal(true); }
  function save() {
    if (!form.title) return;
    if (editBook) {
      setBooks(books.map(b => b.id === editBook.id ? { ...b, ...form } : b));
      showToast("Book updated successfully");
    } else {
      setBooks([{ ...form, id: Date.now(), available: form.stock, rating: 4.0, year: 2024, description: "", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&q=80" }, ...books]);
      showToast("Book added successfully");
    }
    setShowModal(false);
  }
  function del(id) { setBooks(books.filter(b => b.id !== id)); showToast("Book deleted"); }

  return (
    <div style={{ padding: "28px" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search books or authors..." style={{ ...css.input, paddingLeft: 36 }} />
          <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: colors.gray400 }}>🔍</span>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => { setCat(c); setPage(1); }} style={{ ...css.btn(cat === c ? "primary" : "ghost"), padding: "8px 14px", fontSize: 13 }}>{c}</button>
          ))}
        </div>
        <button onClick={openAdd} style={css.btn("primary")}>＋ Add Book</button>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 24 }}>
        {paginated.map(book => (
          <div key={book.id} style={{ ...css.card, padding: 0, overflow: "hidden", transition: "box-shadow 0.2s", cursor: "pointer" }}>
            <div style={{ display: "flex", gap: 0 }}>
              <div style={{ width: 90, flexShrink: 0, overflow: "hidden" }}>
                <img src={book.cover} alt={book.title} style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 130 }} onError={e => { e.target.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&q=80"; }} />
              </div>
              <div style={{ padding: "14px 14px 14px 12px", flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: colors.gray900, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{book.title}</div>
                <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 8 }}>{book.author} · {book.year}</div>
                <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                  <span style={css.badge(colors.blue2, colors.blueLight)}>{book.category}</span>
                  <span style={css.badge(book.available > 0 ? colors.green : colors.red, book.available > 0 ? colors.greenLight : colors.redLight)}>
                    {book.available > 0 ? `${book.available} avail.` : "Out"}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: colors.gray400, marginBottom: 10 }}>Stock: {book.stock} · ⭐ {book.rating}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => openEdit(book)} style={{ ...css.btn("secondary"), padding: "5px 10px", fontSize: 12 }}>Edit</button>
                  <button onClick={() => del(book.id)} style={{ ...css.btn("danger"), padding: "5px 10px", fontSize: 12 }}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)} style={{ ...css.btn(p === page ? "primary" : "ghost"), padding: "7px 14px" }}>{p}</button>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title={editBook ? "Edit Book" : "Add New Book"} onClose={() => setShowModal(false)}>
          {[["Title", "title"], ["Author", "author"], ["ISBN", "isbn"]].map(([l, k]) => (
            <div key={k} style={{ marginBottom: 14 }}>
              <label style={css.label}>{l}</label>
              <input value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} style={css.input} />
            </div>
          ))}
          <div style={{ marginBottom: 14 }}>
            <label style={css.label}>Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={css.input}>
              {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={css.label}>Stock</label>
            <input type="number" min="1" value={form.stock} onChange={e => setForm({ ...form, stock: parseInt(e.target.value) || 1 })} style={css.input} />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setShowModal(false)} style={css.btn("ghost")}>Cancel</button>
            <button onClick={save} style={css.btn("primary")}>Save Book</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── BORROWING PAGE ───────────────────────────────────────────────────────────
function BorrowPage({ showToast }) {
  const [borrows, setBorrows] = useState(MOCK_BORROWS);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ student: "", book: "", due: "" });

  const filtered = filter === "all" ? borrows : borrows.filter(b => b.status === filter);

  function addBorrow() {
    if (!form.student || !form.book || !form.due) { showToast("Please fill all fields"); return; }
    setBorrows([{ id: Date.now(), studentName: form.student, bookTitle: form.book, borrowDate: new Date().toISOString().split("T")[0], dueDate: form.due, status: "active", fine: 0 }, ...borrows]);
    showToast("Book borrowed successfully");
    setShowModal(false);
    setForm({ student: "", book: "", due: "" });
  }
  function markReturn(id) { setBorrows(borrows.map(b => b.id === id ? { ...b, status: "returned" } : b)); showToast("Book returned"); }

  const statusColor = { active: [colors.green, colors.greenLight], overdue: [colors.red, colors.redLight], returned: [colors.gray500, colors.gray100] };

  return (
    <div style={{ padding: "28px" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        {[["all", "All"], ["active", "Active"], ["overdue", "Overdue"], ["returned", "Returned"]].map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v)} style={{ ...css.btn(filter === v ? "primary" : "ghost"), padding: "8px 16px" }}>{l}</button>
        ))}
        <button onClick={() => setShowModal(true)} style={{ ...css.btn("primary"), marginLeft: "auto" }}>＋ New Borrow</button>
      </div>

      <div style={{ ...css.card, padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: colors.gray50 }}>
              {["Student", "Book Title", "Borrow Date", "Due Date", "Status", "Fine", "Action"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: colors.gray500, letterSpacing: 0.5, borderBottom: `1px solid ${colors.gray200}`, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => {
              const [c, bg] = statusColor[b.status];
              return (
                <tr key={b.id} style={{ borderBottom: `1px solid ${colors.gray100}` }}>
                  <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 600, color: colors.gray800 }}>{b.studentName}</td>
                  <td style={{ padding: "12px 16px", fontSize: 14, color: colors.gray700 }}>{b.bookTitle}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: colors.gray500 }}>{b.borrowDate}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: colors.gray500 }}>{b.dueDate}</td>
                  <td style={{ padding: "12px 16px" }}><span style={css.badge(c, bg)}>{b.status}</span></td>
                  <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 600, color: b.fine > 0 ? colors.red : colors.gray500 }}>
                    {b.fine > 0 ? `Rp ${b.fine.toLocaleString()}` : "—"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {b.status === "active" || b.status === "overdue" ? (
                      <button onClick={() => markReturn(b.id)} style={{ ...css.btn("secondary"), padding: "5px 12px", fontSize: 12 }}>Return</button>
                    ) : <span style={{ color: colors.gray400, fontSize: 13 }}>Done</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 20px", color: colors.gray400 }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>📋</div>
            <div>No records found</div>
          </div>
        )}
      </div>

      {showModal && (
        <Modal title="New Borrow Request" onClose={() => setShowModal(false)}>
          <div style={{ marginBottom: 14 }}>
            <label style={css.label}>Student Name</label>
            <select value={form.student} onChange={e => setForm({ ...form, student: e.target.value })} style={css.input}>
              <option value="">Select student...</option>
              {MOCK_STUDENTS.map(s => <option key={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={css.label}>Book</label>
            <select value={form.book} onChange={e => setForm({ ...form, book: e.target.value })} style={css.input}>
              <option value="">Select book...</option>
              {MOCK_BOOKS.filter(b => b.available > 0).map(b => <option key={b.id}>{b.title}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={css.label}>Due Date</label>
            <input type="date" value={form.due} onChange={e => setForm({ ...form, due: e.target.value })} style={css.input} />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setShowModal(false)} style={css.btn("ghost")}>Cancel</button>
            <button onClick={addBorrow} style={css.btn("primary")}>Confirm Borrow</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── STUDENTS PAGE ────────────────────────────────────────────────────────────
function StudentsPage({ showToast }) {
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", studentId: "", grade: "", email: "" });

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.studentId.toLowerCase().includes(search.toLowerCase())
  );

  function add() {
    if (!form.name || !form.studentId) { showToast("Name and Student ID required"); return; }
    setStudents([{ ...form, id: Date.now(), borrowed: 0, status: "active", avatar: form.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() }, ...students]);
    showToast("Student added"); setShowModal(false); setForm({ name: "", studentId: "", grade: "", email: "" });
  }
  function del(id) { setStudents(students.filter(s => s.id !== id)); showToast("Student removed"); }

  const statusColor = { active: [colors.green, colors.greenLight], overdue: [colors.red, colors.redLight] };
  const avatarColors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  return (
    <div style={{ padding: "28px" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." style={{ ...css.input, paddingLeft: 36 }} />
          <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: colors.gray400 }}>🔍</span>
        </div>
        <button onClick={() => setShowModal(true)} style={css.btn("primary")}>＋ Add Student</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {filtered.map((s, i) => {
          const [c, bg] = statusColor[s.status] || [colors.gray500, colors.gray100];
          return (
            <div key={s.id} style={css.card}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: avatarColors[i % avatarColors.length], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: "#fff", flexShrink: 0 }}>{s.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: colors.gray900 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: colors.gray500 }}>{s.studentId} · Grade {s.grade}</div>
                </div>
                <span style={{ ...css.badge(c, bg), marginLeft: "auto", fontSize: 11 }}>{s.status}</span>
              </div>
              <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 6 }}>📧 {s.email}</div>
              <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 14 }}>📚 {s.borrowed} book{s.borrowed !== 1 ? "s" : ""} borrowed</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => showToast(`Viewing ${s.name}'s profile`)} style={{ ...css.btn("secondary"), flex: 1, justifyContent: "center", fontSize: 13 }}>View Profile</button>
                <button onClick={() => del(s.id)} style={{ ...css.btn("danger"), padding: "8px 12px", fontSize: 13 }}>🗑</button>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <Modal title="Add New Student" onClose={() => setShowModal(false)}>
          {[["Full Name", "name"], ["Student ID", "studentId"], ["Grade", "grade"], ["Email", "email"]].map(([l, k]) => (
            <div key={k} style={{ marginBottom: 14 }}>
              <label style={css.label}>{l}</label>
              <input value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} style={css.input} />
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
            <button onClick={() => setShowModal(false)} style={css.btn("ghost")}>Cancel</button>
            <button onClick={add} style={css.btn("primary")}>Add Student</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── DIGITAL LIBRARY ──────────────────────────────────────────────────────────
function DigitalPage({ showToast }) {
  const [favs, setFavs] = useState(new Set([1, 5]));
  const [query, setQuery] = useState("");
  const [reading, setReading] = useState(null);

  const filtered = MOCK_BOOKS.filter(b => b.title.toLowerCase().includes(query.toLowerCase()));
  function toggleFav(id) { const s = new Set(favs); s.has(id) ? s.delete(id) : s.add(id); setFavs(s); showToast(s.has(id) ? "Added to favorites" : "Removed from favorites"); }

  return (
    <div style={{ padding: "28px" }}>
      {reading ? (
        <div>
          <button onClick={() => setReading(null)} style={{ ...css.btn("ghost"), marginBottom: 16 }}>← Back to Library</button>
          <div style={{ ...css.card, maxWidth: 700, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
              <img src={reading.cover} alt={reading.title} style={{ width: 80, height: 120, objectFit: "cover", borderRadius: 8 }} />
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: colors.gray900, marginBottom: 4 }}>{reading.title}</div>
                <div style={{ color: colors.gray500, marginBottom: 8 }}>{reading.author}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={css.badge(colors.blue2, colors.blueLight)}>{reading.category}</span>
                  <span style={{ fontSize: 13, color: colors.amber }}>⭐ {reading.rating}</span>
                </div>
              </div>
            </div>
            <div style={{ background: colors.gray50, borderRadius: 10, padding: 20, fontSize: 15, lineHeight: 1.8, color: colors.gray700 }}>
              <p style={{ marginBottom: 12 }}>{reading.description}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
              <p style={{ marginTop: 12 }}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 6 }}>Reading Progress</div>
              <div style={{ height: 8, borderRadius: 99, background: colors.gray200 }}>
                <div style={{ width: "34%", height: "100%", borderRadius: 99, background: colors.blue2 }} />
              </div>
              <div style={{ fontSize: 12, color: colors.gray400, marginTop: 4 }}>34% complete</div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button onClick={() => showToast("Downloading PDF...")} style={css.btn("primary")}>⬇ Download PDF</button>
              <button onClick={() => toggleFav(reading.id)} style={css.btn("ghost")}>{favs.has(reading.id) ? "❤️" : "🤍"} Favorite</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 10, marginBottom: 24, alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search digital books..." style={{ ...css.input, paddingLeft: 36 }} />
              <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: colors.gray400 }}>🔍</span>
            </div>
            <div style={{ marginLeft: "auto", fontSize: 14, color: colors.gray500 }}>🤖 AI Recommendations active</div>
          </div>

          {/* Recommended section */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.gray900, marginBottom: 14 }}>🤖 AI Recommended for You</div>
            <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
              {MOCK_BOOKS.slice(0, 4).map(b => (
                <div key={b.id} onClick={() => setReading(b)} style={{ ...css.card, minWidth: 180, cursor: "pointer", padding: 12, transition: "box-shadow 0.2s", flexShrink: 0 }}>
                  <img src={b.cover} alt={b.title} style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 8, marginBottom: 8 }} />
                  <div style={{ fontSize: 13, fontWeight: 700, color: colors.gray900, marginBottom: 2 }}>{b.title}</div>
                  <div style={{ fontSize: 12, color: colors.gray500 }}>{b.author}</div>
                  <div style={{ fontSize: 12, color: colors.amber, marginTop: 4 }}>⭐ {b.rating}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 16, fontWeight: 700, color: colors.gray900, marginBottom: 14 }}>All E-Books</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
            {filtered.map(b => (
              <div key={b.id} style={css.card}>
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <img src={b.cover} alt={b.title} style={{ width: 60, height: 85, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: colors.gray900, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.title}</div>
                    <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 6 }}>{b.author}</div>
                    <div style={{ fontSize: 12, color: colors.amber }}>⭐ {b.rating}</div>
                    <span style={{ ...css.badge(colors.blue2, colors.blueLight), marginTop: 6 }}>{b.category}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setReading(b)} style={{ ...css.btn("primary"), flex: 1, justifyContent: "center", fontSize: 13, padding: "7px 0" }}>📖 Read</button>
                  <button onClick={() => toggleFav(b.id)} style={{ ...css.btn("ghost"), padding: "7px 10px" }}>{favs.has(b.id) ? "❤️" : "🤍"}</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── ANALYTICS PAGE ───────────────────────────────────────────────────────────
function AnalyticsPage() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const data = [45, 62, 38, 71, 55, 83];
  const maxV = Math.max(...data);

  return (
    <div style={{ padding: "28px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[["Total Borrows", "284", "+12%", colors.blue2, colors.blueLight], ["Books Returned", "261", "+8%", colors.green, colors.greenLight], ["Fines Collected", "Rp 48.000", "-3%", colors.amber, colors.amberLight], ["New Members", "23", "+31%", "#8b5cf6", "#ede9fe"]].map(([l, v, ch, c, bg]) => (
          <div key={l} style={css.card}>
            <div style={{ fontSize: 12, color: colors.gray500, fontWeight: 600, marginBottom: 6 }}>{l}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: colors.gray900, marginBottom: 4 }}>{v}</div>
            <div style={{ fontSize: 12, color: ch.startsWith("+") ? colors.green : colors.red, fontWeight: 600 }}>{ch} vs last month</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <div style={css.card}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: colors.gray900 }}>Monthly Borrowing Trend</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 20 }}>2025 — books borrowed per month</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 180 }}>
            {months.map((m, i) => (
              <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: colors.blue2 }}>{data[i]}</div>
                <div style={{ width: "100%", background: `linear-gradient(to top, ${colors.blue2}, ${colors.blue3})`, borderRadius: "6px 6px 0 0", height: `${(data[i] / maxV) * 140}px`, transition: "height 0.5s" }} />
                <div style={{ fontSize: 12, color: colors.gray500 }}>{m}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={css.card}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: colors.gray900 }}>Top Books</div>
          {MOCK_BOOKS.slice(0, 5).map((b, i) => (
            <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: i < 3 ? colors.blueLight : colors.gray100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: i < 3 ? colors.blue2 : colors.gray500 }}>{i + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray800, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.title}</div>
                <div style={{ fontSize: 11, color: colors.gray400 }}>{b.stock - b.available} borrows</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SETTINGS PAGE ────────────────────────────────────────────────────────────
function SettingsPage({ showToast }) {
  const [settings, setSettings] = useState({ libraryName: "SMA Negeri 1 Library", email: "library@school.edu", finePer: 2000, maxBorrow: 3, borrowDays: 14, lang: "id", notifications: true, autoRemind: true });
  return (
    <div style={{ padding: "28px", maxWidth: 600 }}>
      <div style={css.card}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: colors.gray900 }}>Library Settings</div>
        {[["Library Name", "libraryName", "text"], ["Contact Email", "email", "email"]].map(([l, k, t]) => (
          <div key={k} style={{ marginBottom: 16 }}>
            <label style={css.label}>{l}</label>
            <input type={t} value={settings[k]} onChange={e => setSettings({ ...settings, [k]: e.target.value })} style={css.input} />
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div>
            <label style={css.label}>Fine / Day (Rp)</label>
            <input type="number" value={settings.finePer} onChange={e => setSettings({ ...settings, finePer: e.target.value })} style={css.input} />
          </div>
          <div>
            <label style={css.label}>Max Borrow</label>
            <input type="number" value={settings.maxBorrow} onChange={e => setSettings({ ...settings, maxBorrow: e.target.value })} style={css.input} />
          </div>
          <div>
            <label style={css.label}>Borrow Days</label>
            <input type="number" value={settings.borrowDays} onChange={e => setSettings({ ...settings, borrowDays: e.target.value })} style={css.input} />
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={css.label}>Language</label>
          <select value={settings.lang} onChange={e => setSettings({ ...settings, lang: e.target.value })} style={css.input}>
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>
        {[["notifications", "Enable Notifications"], ["autoRemind", "Auto Due-Date Reminders"]].map(([k, l]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${colors.gray100}` }}>
            <span style={{ fontSize: 14, color: colors.gray700 }}>{l}</span>
            <button onClick={() => setSettings({ ...settings, [k]: !settings[k] })} style={{ width: 44, height: 24, borderRadius: 99, background: settings[k] ? colors.blue2 : colors.gray200, border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: settings[k] ? 23 : 3, transition: "left 0.2s" }} />
            </button>
          </div>
        ))}
        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <button onClick={() => showToast("Settings saved!")} style={css.btn("primary")}>Save Settings</button>
          <button onClick={() => showToast("Data exported to Excel")} style={css.btn("ghost")}>📥 Export Data</button>
        </div>
      </div>
    </div>
  );
}

// ── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "", role: "student" });
  const [error, setError] = useState("");

  function submit() {
    if (!form.email || !form.password) { setError("Please fill all fields"); return; }
    if (tab === "login") {
      const roleMap = { "admin@school.edu": "admin", "lib@school.edu": "librarian" };
      onLogin(roleMap[form.email] || "student");
    } else {
      if (!form.name) { setError("Name required"); return; }
      onLogin(form.role);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.blue} 60%, #1e40af 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", overflow: "hidden" }}>
      {/* Decorative circles */}
      {[[300, -100, 500], [-100, 200, 300], [400, 400, 200]].map(([x, y, s], i) => (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />
      ))}

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📖</div>
          <div style={{ color: "#fff", fontSize: 28, fontWeight: 800, letterSpacing: 0.5 }}>LibraryHub</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 4 }}>School Library Management System</div>
        </div>

        <div style={{ background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: `1px solid ${colors.gray100}` }}>
            {["login", "register"].map(t => (
              <button key={t} onClick={() => { setTab(t); setError(""); }} style={{ flex: 1, padding: "16px", border: "none", background: tab === t ? colors.white : colors.gray50, fontWeight: tab === t ? 700 : 400, fontSize: 15, color: tab === t ? colors.blue2 : colors.gray500, cursor: "pointer", borderBottom: tab === t ? `2px solid ${colors.blue2}` : "2px solid transparent", transition: "all 0.15s" }}>
                {t === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <div style={{ padding: "28px 28px 24px" }}>
            {tab === "register" && (
              <div style={{ marginBottom: 16 }}>
                <label style={css.label}>Full Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" style={css.input} />
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <label style={css.label}>Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@school.edu" style={css.input} />
            </div>
            <div style={{ marginBottom: 4 }}>
              <label style={css.label}>Password</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" style={css.input} />
            </div>
            {tab === "login" && (
              <div style={{ textAlign: "right", marginBottom: 16 }}>
                <button style={{ background: "none", border: "none", color: colors.blue2, fontSize: 13, cursor: "pointer", fontWeight: 500 }}>Forgot password?</button>
              </div>
            )}
            {tab === "register" && (
              <div style={{ margin: "16px 0" }}>
                <label style={css.label}>Role</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={css.input}>
                  <option value="student">Student</option>
                  <option value="librarian">Librarian</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}
            {error && <div style={{ color: colors.red, fontSize: 13, marginBottom: 12, background: colors.redLight, padding: "8px 12px", borderRadius: 8 }}>⚠ {error}</div>}
            <button onClick={submit} style={{ ...css.btn("primary"), width: "100%", justifyContent: "center", padding: "12px", fontSize: 15 }}>
              {tab === "login" ? "Sign In →" : "Create Account →"}
            </button>
            {tab === "login" && (
              <div style={{ marginTop: 16, padding: "12px", background: colors.blueSoft, borderRadius: 10, fontSize: 12, color: colors.gray600 }}>
                <strong>Demo:</strong> admin@school.edu / lib@school.edu · any password
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [auth, setAuth] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(msg) { setToast(msg); }

  if (!auth) return <LoginPage onLogin={role => setAuth(role)} />;

  const pageComponents = {
    dashboard: <DashboardPage showToast={showToast} />,
    books: <BooksPage showToast={showToast} />,
    borrow: <BorrowPage showToast={showToast} />,
    students: <StudentsPage showToast={showToast} />,
    digital: <DigitalPage showToast={showToast} />,
    analytics: <AnalyticsPage />,
    settings: <SettingsPage showToast={showToast} />,
  };

  return (
    <div style={{ display: "flex", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", minHeight: "100vh" }}>
      <Sidebar active={page} setActive={setPage} role={auth} />
      <div style={css.main}>
        <Topbar page={page} darkMode={darkMode} setDarkMode={setDarkMode} showToast={showToast} />
        {pageComponents[page] || pageComponents.dashboard}
      </div>
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
