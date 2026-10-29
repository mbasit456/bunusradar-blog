# Gravity Modern - WordPress Theme

**Gravity Modern** is a high-performance, responsive, and SEO-optimized WordPress theme designed for technology blogs, digital publications, software engineering teams, and modern content creators.

---

## Key Features

- ⚡ **Ultra-Fast & Lightweight:** Pure vanilla JS and clean CSS architecture. Zero bloat, zero heavy frameworks.
- 📱 **Fully Responsive & Fluid:** Adapts seamlessly to smartphones, tablets, laptops, and ultra-wide screens.
- 🌓 **Dark Mode Adaptability:** Automatic theme adjustment matching the user's operating system preferences.
- ⏱️ **Automatic Reading Time Calculator:** Displays estimated reading duration for every post.
- 🧩 **Native Block Editor (Gutenberg) Ready:** Full support for `alignwide`, `alignfull`, responsive embeds, and custom editor styling.
- 🔍 **Accessible & SEO-Structured:** Semantic HTML5 landmarks, Schema-ready markup, ARIA labels, and skip links.
- 🎯 **Hero Feature Layout:** Automatically highlights the latest post on the homepage with an expansive hero banner.
- 💬 **Modern Threaded Comments:** Clean conversation threads with author badges and responsive form controls.
- 🛠️ **Customizer & Widgets:** 4 widget-ready areas (Primary Sidebar and 3 Footer Columns).

---

## Theme Structure

```text
gravity-modern/
├── 404.php                     # 404 Error page template
├── archive.php                 # Category, Tag, Author, and Date archives
├── comments.php                # Threaded comments template & form
├── footer.php                  # Site footer, widget areas & back-to-top
├── functions.php               # Theme setup, scripts, widgets & helpers
├── header.php                  # Site header, navigation, and search toggle
├── index.php                   # Main blog loop & hero featured article
├── page.php                    # Static page template
├── search.php                  # Search results layout & count summary
├── sidebar.php                 # Dynamic widget sidebar
├── single.php                  # Single article view with author box & next/prev nav
├── style.css                   # Core stylesheet, CSS variables & typography
├── screenshot.png              # Theme preview image for WordPress dashboard
├── assets/
│   ├── js/
│   │   └── main.js             # Mobile menu, search bar drawer & scroll to top
│   └── css/
└── template-parts/
    ├── content.php             # Grid post card template
    ├── content-none.php        # Empty results / nothing found
    ├── content-page.php        # Static page content
    ├── content-search.php      # Search item card
    └── content-single.php      # Single article layout & tags
```

---

## Installation Guide

### Method 1: Upload via WordPress Admin (Recommended)
1. In your WordPress admin dashboard, go to **Appearance > Themes**.
2. Click **Add New Theme**, then click **Upload Theme**.
3. Choose the `gravity-modern.zip` file and click **Install Now**.
4. Click **Activate**.

### Method 2: Manual Directory Upload (FTP / cPanel / Localhost)
1. Copy the `gravity-modern` folder into your WordPress installation at:
   ```
   wp-content/themes/gravity-modern
   ```
2. Navigate to **Appearance > Themes** in your WordPress admin panel.
3. Locate **Gravity Modern** and click **Activate**.

---

## Recommended Configuration

1. **Navigation Menus:**
   - Go to **Appearance > Menus**.
   - Create a menu and assign it to the **Primary Header Menu** location.
   - Optionally create a secondary menu and assign it to **Footer Menu**.

2. **Logo & Site Title:**
   - Go to **Appearance > Customize > Site Identity**.
   - Upload your logo or set your publication title and tagline.

3. **Widgets:**
   - Go to **Appearance > Widgets**.
   - Add widgets (such as Recent Posts, Categories, Newsletter Signup, or Custom HTML) to **Primary Sidebar** and the **Footer Columns**.
