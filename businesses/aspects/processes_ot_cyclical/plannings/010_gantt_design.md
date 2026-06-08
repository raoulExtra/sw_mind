in English pls.
Lite
20:02
To design a GUI that seamlessly integrates with the style of OnlineGantt.com, you need to follow its specific design language, which can be described as "Modern Utility / SaaS Minimalism." It relies heavily on functional density and clean, framework-based layouts (likely Bootstrap and Syncfusion).
Here is the "Style Guide" to replicate this look:
1. Color Palette
The design uses a cool, professional palette with targeted accent colors for specific actions:
Primary Charcoal (#343a40): Used for main action buttons (New, Open, Save) and high-level navigation text.
Action Green (#28a745): Reserved for primary CTAs like "Try Cloud" or positive confirmations.
Warning Yellow (#ffc107): Used for milestones or highlights (e.g., star ratings/reviews).
Background Gray (#f8f9fa): Applied to toolbar backgrounds and grid headers to provide subtle contrast.
Border Gray (#dee2e6): Very fine, light gray lines used for grid cell separation and container borders.
2. Typography & Spacing
Font Stack: A clean sans-serif stack (likely Segoe UI, Roboto, or Helvetica Neue). Font sizes are compact (approx. 12-14px) to maximize information density.
Tight Padding: The UI is "density-first." Buttons have minimal internal padding, and grid rows are kept slim to allow as many tasks as possible to be visible without scrolling.
3. UI Component Logic
Buttons: Flat design with slightly rounded corners (border-radius: 4px). They use a subtle darken effect on hover rather than shadows or gradients.
Dropdowns: Standard functional style with a simple chevron icon to indicate interactivity.
Split-View Layout: The core workspace uses a TreeGrid on the left for hierarchical data and a Canvas/SVG timeline on the right for visualization.
Iconography: Extremely sparse and functional. Icons are monochromatic and used only where they significantly aid recognition (e.g., Zoom, Hamburger menu).
4. Visual Hierarchy
The interface follows a strict horizontal layering:
Global Header: Slim, white background, logo on the left, primary CTAs on the right.
Primary Toolbar: Dark buttons on a light gray background for core file operations.
Secondary Toolbar: Functional icons (Zoom, Add, Edit) placed directly above the workspace for context.
Main Workspace: High contrast between the white grid background and the vibrant task bars.
Summary for Building Your GUI:
If you are building a tool to match this, use a framework like Tailwind CSS or Bootstrap 5. Focus on a "Density-First" strategy—avoid large shadows, gradients, or excessive white space. Everything should feel functional, clearly delineated, and optimized for professional efficiency.
The object-oriented DOT model I provided earlier maps these elements as classes, which can help you translate this visual structure directly into component-based code (like React or Vue)