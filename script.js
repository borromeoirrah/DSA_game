        //=========================================================================
        // SEMANTIC VERSIONING (SemVer 2.0.0)
        // Single source of truth. Do not hard-code the version elsewhere.
        // MAJOR: breaking change (e.g. changing bridge function names/signatures that Python depends on)
        // MINOR: new backward-compatible feature (e.g. finishing a new topic's code)
        // PATCH: bug fix or small tweak with no new feature
        // Use 0.x.y while in development; move to 1.0.0 once all 11 topics are complete.
        //=========================================================================
        const APP_VERSION = "0.3.0";

        let pyodideInstance = null;
        let gardenPlants = {};
        // Display-only list of action labels (populated by Python via pushAction). No JS game logic.
        let displayActionHistory = [];

        //=========================================================================
        // TOPIC TEMPLATES — paste your Python for each topic into the matching entry.
        // Call the bridge functions from your Python to update the UI.
        //=========================================================================
        const topicTemplates = {
            1: {
                title: "TOPIC 1: Python OOP + Big O + Stacks",
                code: `# Topic 1: Python OOP + Big O + Stacks
# ==== WRITE YOUR CODE HERE ====
# Use pushAction(action_str) to display history entries.
# Use updateResources(...) to set resource values.
# ==== ==== ==== ==== ==== ====


class Plant:
    def __init__(self, name, water_need):
        self.name = name
        self.water_need = water_need
        self.health = 100

        print(f"Congrats, your plant named {self.name} created successfully!")

plant_obj = Plant("Strawberry🍓", 10)


updateResources(
    water=200,
    seeds=90,
    energy=110,
    hope=80,
    coins=999
)


addPlantsToDropdown([
    ("Strawberry", "🍓", 20),
    ("Orange", "🍊", 10),
    ("Tomato", "🍅", 15),
    ("Carrot", "🥕", 12),
    ("Ginger", "🫚", 8)
])

print(" Resource Storage and Plant dropdown unlocked! ")

# ==== Stacks ====
class ActionHistoryStack:
    def __init__(self):
        self.plant_stack = []
   
    def push_action(self, plant_name):
        self.plant_stack.append(plant_name)
        pushAction(action_string)

    def pop_action(self):
        if not self.isEmpty():
           top = self.plant_stack[-1]
        return top

    def peek(self):
        if self.isEmpty():
            return "Stack is empty"
        return self.stack[-1]

    def is_empty(self):
        return len(self.stack) == 0

pushAction("strawberry")
pushAction("orange")
pushAction("tomato")
pushAction("carrot")
pushAction("ginger")

print("Action History Stack ready! (push, pop & peek tested)")

`
            },

            

            2: {
                title: "TOPIC 2: Queues & Deques (FIFO Elements)",
                code: `# Topic 2: Queues & Deques (FIFO Elements)
# ==== WRITE YOUR CODE HERE ====
# Climate hazards are processed one at a time in FIFO order.
# UI bridge: updateClimateQueue(events, active_hazard)
# ==== ==== ==== ==== ==== ====


from collections import deque

class ClimateQueue:
    def __init__(self):
        self.queue = deque()
        self.active_hazard = None

    def enqueue_hazard(self, hazard_name):
        allowed_hazards = {"Flood", "Heatwaves", "Earthquake"}
        if hazard_name not in allowed_hazards:
            print(f"Unknown climate hazard: {hazard_name}")
            return False
        self.queue.append(hazard_name)
        self.refresh_display()
        return True

    def process_next_hazard(self):
        # Do not start another hazard while one is still active.
        if self.active_hazard is not None:
            print(f"Resolve {self.active_hazard} before processing another hazard.")
            return self.active_hazard
        if not self.queue:
            print("No pending climate hazards.")
            self.refresh_display()
            return None

        # popleft() guarantees FIFO: the oldest queued hazard is activated first.
        self.active_hazard = self.queue.popleft()
        self.refresh_display()
        print(f"WARNING: {self.active_hazard} is now active!")
        return self.active_hazard

    def resolve_active_hazard(self):
        if self.active_hazard is None:
            print("There is no active climate hazard to resolve.")
            return False
        resolved = self.active_hazard
        self.active_hazard = None
        self.refresh_display()
        print(f"{resolved} resolved. You may process the next hazard.")
        return True

    def refresh_display(self):
        # Keep the active hazard visible at the front of the visual queue,
        # even though it has already been removed from the pending deque.
        display_items = list(self.queue)
        if self.active_hazard is not None:
            display_items.insert(0, self.active_hazard)
        updateClimateQueue(display_items, self.active_hazard or "")


# Initial climate hazards, in the order they enter the queue.
climate_queue = ClimateQueue()
climate_queue.enqueue_hazard("Flood")
climate_queue.enqueue_hazard("Heatwaves")
climate_queue.enqueue_hazard("Earthquake")
climate_queue.refresh_display()

# These functions are called by the Climate Queue buttons in the HTML UI.
def process_next_hazard():
    return climate_queue.process_next_hazard()

def resolve_active_hazard():
    return climate_queue.resolve_active_hazard()

print("Climate Queue (FIFO) ready! ")
print("Click 'Process Next Hazard' to activate the next climate hazard in the queue.")

`
            },



            3: {
                title: "TOPIC 3: Static/Dynamic Arrays, 2D Lists, & Memory Structures",
                code: `# Topic 3: Static/Dynamic Arrays, 2D Lists, & Memory Structures
# ==== WRITE YOUR CODE HERE ====
# Use addPlantToGrid(pos, name) and addPlantsToDropdown(plants) for the garden grid.
# ==== ==== ==== ==== ==== ====


from js import document, Audio
from pyodide.ffi import create_proxy


# Background music
bgm = Audio.new(
    "magtanim.mp3"
)
bgm.loop = True
bgm.volume = 0.25


music_started = False


def start_bgm():
    global music_started


    if not music_started:
        bgm.play()
        music_started = True

class Garden:
    def __init__(self):
        # Empty 5x5 garden
        self.grid = [[None for _ in range(5)] for _ in range(5)]

        # Starting resources
        self.seeds = 90
        self.water = 200

    def add_plant(self, row, col, plant):

        # Check valid position
        if not (0 <= row < 5 and 0 <= col < 5):
            return False

        # Do not plant on an occupied tile
        if self.grid[row][col] is not None:
            return False

        # Check if there are enough seeds and water
        if self.seeds <= 0:
            print("No seeds left!")
            return False

        if self.water < 10:
            print("Not enough water!")
            return False

        # Store plant
        self.grid[row][col] = plant

        # Deduct only these two resources
        self.seeds -= 1
        self.water -= 10

        # Plant emojis
        emojis = {
            "Strawberry": "🍓",
            "Orange": "🍊",
            "Tomato": "🍅",
            "Carrot": "🥕",
            "Ginger": "🫚"
        }

        emoji = emojis.get(plant, "🌱")

        # Convert row/column to tile position
        position = row * 5 + col

        # Get garden grid
        grid = document.getElementById("garden-grid")
        cell = grid.children[position]

        # Display plant
        cell.textContent = emoji

        # Update ONLY the resource values that changed.
        # The other values stay exactly the same.
        updateResources(
            self.water,   # Water: changes
            self.seeds,   # Seeds: changes
            110,          # Solar Energy: stays 110
            80,           # Community Hope: stays 80
            999           # Coins / Dues: stays 999
        )

        print(f"{emoji} {plant} planted!")
        print(f"Water: {self.water} / 200 L")
        print(f"Seeds: {self.seeds} / 100")

        return True

    def remove_plant(self, row, col):

        if 0 <= row < 5 and 0 <= col < 5:
            if self.grid[row][col] is not None:
                self.grid[row][col] = None
                position = row * 5 + col
                grid = document.getElementById("garden-grid")
                cell = grid.children[position]

                # Make tile empty again
                cell.textContent = "⬜"
                return True
        return False

    def display(self):
        for row in self.grid:
            print(row)

# Create garden
garden = Garden()

# Seed Bag
addPlantsToDropdown([
    ("Strawberry", "🍓", 20),
    ("Orange", "🍊", 10),
    ("Tomato", "🍅", 15),
    ("Carrot", "🥕", 12),
    ("Ginger", "🫚", 8)
])

# Initial resources
updateResources(
    200,   # Water Reserves
    90,    # Seed Inventory
    110,   # Solar Energy
    80,    # Community Hope
    999    # Coins / Dues
)

# Keep click functions alive
click_proxies = []


# When a tile is clicked


def plant_clicked(position):
    # Start background music on the first tile click
    start_bgm()


    row = position // 5
    col = position % 5


    # Get selected plant
    selector = document.getElementById("crop-selector")
    plant = selector.value


    # Plant on clicked tile
    garden.add_plant(row, col, plant)




# Make 25 tiles clickable
def setup_grid_clicks():
    grid = document.getElementById("garden-grid")
    for i in range(25):
        cell = grid.children[i]
        callback = create_proxy(
            lambda event, pos=i: plant_clicked(pos)
        )
        click_proxies.append(callback)
        cell.addEventListener("click", callback)


# Activate clickable garden
setup_grid_clicks()
print("Garden Grid unlocked! ")
print("Select Strawberry, Orange, Tomato, Carrot, or Ginger. ")
print("Click an empty tile to plant.")

`

            },



            4: {
                title: "TOPIC 4: Hierarchical Trees & Traversals",
                code: `# Topic 4: Hierarchical Trees & Traversals
# ==== WRITE YOUR CODE HERE ====
# ==========================================
# CREATE TREE UI
# ==========================================


from js import document
from pyodide.ffi import create_proxy

# ==========================================
# TREE NODE
# ==========================================

class GardenNode:

    def __init__(self, name, emoji):
        self.name = name
        self.emoji = emoji
        self.children = []


# ==========================================
# CREATE GARDEN TREE
# ==========================================

seed = GardenNode("Seed", "🌱")

fruits = GardenNode("Fruits", "🍎")
vegetables = GardenNode("Vegetables", "🥕")

strawberry = GardenNode("Strawberry", "🍓")
orange = GardenNode("Orange", "🍊")

tomato = GardenNode("Tomato", "🍅")
carrot = GardenNode("Carrot", "🥕")
ginger = GardenNode("Ginger", "🫚")


# Build hierarchy

seed.children = [
    fruits,
    vegetables
]

fruits.children = [
    strawberry,
    orange
]

vegetables.children = [
    tomato,
    carrot,
    ginger
]

# ==========================================
# VARIABLES
# ==========================================

selected_node = None
selected_traversal = "BFS"

tree_proxies = []

# ==========================================
# BFS
# ==========================================

def bfs(root):

    result = []
    queue = [root]

    while queue:

        node = queue.pop(0)
        result.append(node)

        for child in node.children:
            queue.append(child)

    return result


# ==========================================
# DFS PREORDER
# ==========================================

def preorder(node, result=None):

    if result is None:
        result = []

    result.append(node)

    for child in node.children:
        preorder(child, result)

    return result


# ==========================================
# DFS INORDER
# ==========================================

def inorder(node, result=None):

    if result is None:
        result = []

    if len(node.children) > 0:
        inorder(node.children[0], result)

    result.append(node)

    for child in node.children[1:]:
        inorder(child, result)

    return result


# ==========================================
# DFS POSTORDER
# ==========================================

def postorder(node, result=None):

    if result is None:
        result = []

    for child in node.children:
        postorder(child, result)

    result.append(node)

    return result


# ==========================================
# GET TRAVERSAL
# ==========================================

def get_traversal():

    if selected_traversal == "BFS":
        return bfs(seed)

    elif selected_traversal == "Preorder":
        return preorder(seed)

    elif selected_traversal == "Inorder":
        return inorder(seed)

    elif selected_traversal == "Postorder":
        return postorder(seed)

    return bfs(seed)


# ==========================================
# OUTPUT
# ==========================================

def display_output(message):

    output = document.getElementById(
        "tree-output"
    )

    if output:
        output.innerHTML = (
            f'<div class="text-emerald-300">{message}</div>'
        )


# ==========================================
# STATUS
# ==========================================

def update_status(message):

    status = document.getElementById(
        "tree-status"
    )

    if status:
        status.textContent = message


# ==========================================
# SELECT NODE
# ==========================================

def select_node(node):

    global selected_node

    selected_node = node

    # ======================================
    # SEED SELECTED
    # ======================================

    if node == seed:

        update_status(
            "🌱 Seed selected. Choose Fruits or Vegetables."
        )

        display_output(
            "Choose categories: Fruits or Vegetables"
        )

        show_category_buttons()

        return


    # ======================================
    # FRUITS SELECTED
    # ======================================

    if node == fruits:

        update_status(
            "🍎 Fruits selected. Choose Strawberry or Orange."
        )

        display_output(
            "Choose fruit: Strawberry or Orange"
        )

        show_fruit_buttons()

        return


    # ======================================
    # VEGETABLES SELECTED
    # ======================================

    if node == vegetables:

        update_status(
            "🥕 Vegetables selected. Choose Tomato, Carrot, or Ginger."
        )

        display_output(
            "Choose vegetable: Tomato, Carrot, or Ginger"
        )

        show_vegetable_buttons()

        return


    # ======================================
    # SPECIFIC PLANT SELECTED
    # ======================================

    update_status(
        f"{node.emoji} {node.name} selected. Click Plant."
    )

    display_output(
        f"Selected: {node.name}"
    )

    # Show Plant button
    show_action_buttons()


# ==========================================
# CHANGE TRAVERSAL
# ==========================================

def change_traversal(event):

    global selected_traversal

    selector = document.getElementById(
        "garden-traversal"
    )

    selected_traversal = selector.value

    update_status(
        f"{selected_traversal} selected."
    )


# ==========================================
# GARDEN ACTIONS
# ==========================================

def perform_action(action):

    # ======================================
    # PLANT
    # ======================================

    if action == "Plant":

        # No plant selected
        if selected_node is None:

            display_output(
                "Please select Seed first."
            )

            return


        # Seed selected
        if selected_node == seed:

            display_output(
                "Please choose Fruits or Vegetables first."
            )

            return


        # Category selected
        if selected_node == fruits:

            display_output(
                "Please choose Strawberry or Orange first."
            )

            return


        if selected_node == vegetables:

            display_output(
                "Please choose Tomato, Carrot, or Ginger first."
            )

            return


        # ==================================
        # SPECIFIC PLANT
        # ==================================

        plant_name = selected_node.name.lower()

        display_output(
            f"Planted {plant_name}"
        )

        update_status(
            f"{selected_node.emoji} Planted {plant_name}"
        )

        return


    # ======================================
    # WATER
    # ======================================

    if action == "Water":

        display_output(
            "Successfully watered!"
        )

        return


# ==========================================
# NODE BUTTON
# ==========================================

def create_node_button(node):

    button = document.createElement(
        "button"
    )

    button.textContent = (
        f"{node.emoji} {node.name}"
    )

    button.className = (
        "px-3 py-2 rounded-lg "
        "font-bold text-white "
        "whitespace-nowrap "
        "cursor-pointer "
        "transition "
        "hover:brightness-110 "
        "active:scale-95"
    )


    # ======================================
    # COLORS
    # ======================================

    if node == seed:

        button.className += (
            " bg-green-700"
        )

    elif node == fruits:

        button.className += (
            " bg-orange-700"
        )

    elif node == vegetables:

        button.className += (
            " bg-yellow-700"
        )

    elif node == strawberry:

        button.className += (
            " bg-red-700"
        )

    elif node == orange:

        button.className += (
            " bg-orange-600"
        )

    elif node == tomato:

        button.className += (
            " bg-red-600"
        )

    elif node == carrot:

        button.className += (
            " bg-orange-500"
        )

    elif node == ginger:

        button.className += (
            " bg-yellow-600"
        )


    # ======================================
    # CLICK EVENT
    # ======================================

    callback = create_proxy(
        lambda event, n=node:
        select_node(n)
    )

    button.addEventListener(
        "click",
        callback
    )

    tree_proxies.append(callback)

    return button


# ==========================================
# SHOW / HIDE TREE BUTTONS
# ==========================================

def hide_all_choices():

    choices = [
        "fruits-button",
        "vegetables-button",
        "strawberry-button",
        "orange-button",
        "tomato-button",
        "carrot-button",
        "ginger-button",
        "plant-action-button",
        "water-action-button"
    ]

    for button_id in choices:

        element = document.getElementById(
            button_id
        )

        if element:
            element.style.display = "none"


# ==========================================
# SHOW CATEGORY BUTTONS
# ==========================================

def show_category_buttons():

    hide_all_choices()

    fruits_button = document.getElementById(
        "fruits-button"
    )

    vegetables_button = document.getElementById(
        "vegetables-button"
    )

    if fruits_button:
        fruits_button.style.display = "block"

    if vegetables_button:
        vegetables_button.style.display = "block"


# ==========================================
# SHOW FRUIT BUTTONS
# ==========================================

def show_fruit_buttons():

    hide_all_choices()

    strawberry_button = document.getElementById(
        "strawberry-button"
    )

    orange_button = document.getElementById(
        "orange-button"
    )

    if strawberry_button:
        strawberry_button.style.display = "block"

    if orange_button:
        orange_button.style.display = "block"


# ==========================================
# SHOW VEGETABLE BUTTONS
# ==========================================

def show_vegetable_buttons():

    hide_all_choices()

    tomato_button = document.getElementById(
        "tomato-button"
    )

    carrot_button = document.getElementById(
        "carrot-button"
    )

    ginger_button = document.getElementById(
        "ginger-button"
    )

    if tomato_button:
        tomato_button.style.display = "block"

    if carrot_button:
        carrot_button.style.display = "block"

    if ginger_button:
        ginger_button.style.display = "block"


# ==========================================
# SHOW ACTION BUTTONS
# ==========================================

def show_action_buttons():

    plant_button = document.getElementById(
        "plant-action-button"
    )

    water_button = document.getElementById(
        "water-action-button"
    )

    if plant_button:
        plant_button.style.display = "block"

    if water_button:
        water_button.style.display = "block"


# ==========================================
# CREATE HIERARCHICAL TREE UI
# ==========================================

def create_tree_ui():

    game = document.getElementById(
        "view-game"
    )

    # Remove old panel
    old_panel = document.getElementById(
        "hierarchical-tree-panel"
    )

    if old_panel:
        old_panel.remove()


    # ======================================
    # MAIN PANEL
    # ======================================

    panel = document.createElement(
        "div"
    )

    panel.id = (
        "hierarchical-tree-panel"
    )

    panel.className = (
        "mt-4 p-4 rounded-2xl "
        "bg-[#172017] "
        "border border-emerald-800"
    )


    # ======================================
    # TITLE
    # ======================================

    title = document.createElement(
        "h3"
    )

    title.className = (
        "text-lg font-bold "
        "text-emerald-300"
    )

    title.textContent = (
        "🌱 Hierarchical Garden Tree"
    )

    panel.appendChild(title)


    description = document.createElement(
        "p"
    )

    description.className = (
        "text-sm text-gray-400 mb-4"
    )

    description.textContent = (
        "Click a tree node to select it."
    )

    panel.appendChild(description)


    # ======================================
    # TREE VISUAL AREA
    # ======================================

    tree_area = document.createElement(
        "div"
    )

    tree_area.className = (
        "relative w-full "
        "overflow-x-auto "
        "pb-4"
    )


    # ======================================
    # TREE CONTAINER
    # ======================================

    tree = document.createElement(
        "div"
    )

    tree.className = (
        "relative "
        "min-w-[620px] "
        "h-[270px] "
        "mx-auto"
    )


    # ======================================
    # SVG CONNECTOR LINES
    # ======================================

    svg = document.createElement(
        "svg"
    )

    svg.setAttribute(
        "viewBox",
        "0 0 1000 270"
    )

    svg.setAttribute(
        "preserveAspectRatio",
        "none"
    )

    svg.className = (
        "absolute inset-0 "
        "w-full h-full "
        "pointer-events-none"
    )


    def add_line(x1, y1, x2, y2):

        line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        )

        line.setAttribute(
            "x1", str(x1)
        )

        line.setAttribute(
            "y1", str(y1)
        )

        line.setAttribute(
            "x2", str(x2)
        )

        line.setAttribute(
            "y2", str(y2)
        )

        line.setAttribute(
            "stroke",
            "#000000"
        )

        line.setAttribute(
            "stroke-width",
            "8"
        )

        svg.appendChild(line)


    # Seed → Fruits
    add_line(500, 45, 250, 120)

    # Seed → Vegetables
    add_line(500, 45, 750, 120)

    # Fruits → Strawberry
    add_line(250, 145, 150, 220)

    # Fruits → Orange
    add_line(250, 145, 350, 220)

    # Vegetables → Tomato
    add_line(750, 145, 550, 220)

    # Vegetables → Carrot
    add_line(750, 145, 700, 220)

    # Vegetables → Ginger
    add_line(750, 145, 850, 220)


    tree.appendChild(svg)


    # ======================================
    # SEED
    # ======================================

    seed_button = create_node_button(seed)

    seed_wrapper = document.createElement("div")

    seed_wrapper.className = (
        "absolute "
        "top-0 left-1/2 "
        "-translate-x-1/2"
    )

    seed_wrapper.appendChild(seed_button)

    tree.appendChild(seed_wrapper)


    # ======================================
    # FRUITS
    # ======================================

    fruits_button = create_node_button(fruits)
    fruits_button.id = "fruits-button"

    fruits_wrapper = document.createElement("div")

    fruits_wrapper.className = (
        "absolute "
        "top-[82px] left-[25%] "
        "-translate-x-1/2"
    )

    fruits_wrapper.appendChild(fruits_button)

    tree.appendChild(fruits_wrapper)


    # ======================================
    # VEGETABLES
    # ======================================

    vegetables_button = create_node_button(
        vegetables
    )

    vegetables_button.id = "vegetables-button"

    vegetables_wrapper = document.createElement("div")

    vegetables_wrapper.className = (
        "absolute "
        "top-[82px] left-[75%] "
        "-translate-x-1/2"
    )

    vegetables_wrapper.appendChild(
        vegetables_button
    )

    tree.appendChild(
        vegetables_wrapper
    )


    # ======================================
    # STRAWBERRY
    # ======================================

    strawberry_button = create_node_button(
        strawberry
    )

    strawberry_button.id = (
        "strawberry-button"
    )

    strawberry_wrapper = document.createElement("div")

    strawberry_wrapper.className = (
        "absolute "
        "top-[190px] left-[15%] "
        "-translate-x-1/2"
    )

    strawberry_wrapper.appendChild(
        strawberry_button
    )

    tree.appendChild(
        strawberry_wrapper
    )


    # ======================================
    # ORANGE
    # ======================================

    orange_button = create_node_button(
        orange
    )

    orange_button.id = "orange-button"

    orange_wrapper = document.createElement("div")

    orange_wrapper.className = (
        "absolute "
        "top-[190px] left-[35%] "
        "-translate-x-1/2"
    )

    orange_wrapper.appendChild(
        orange_button
    )

    tree.appendChild(
        orange_wrapper
    )


    # ======================================
    # TOMATO
    # ======================================

    tomato_button = create_node_button(
        tomato
    )

    tomato_button.id = "tomato-button"

    tomato_wrapper = document.createElement("div")

    tomato_wrapper.className = (
        "absolute "
        "top-[190px] left-[55%] "
        "-translate-x-1/2"
    )

    tomato_wrapper.appendChild(
        tomato_button
    )

    tree.appendChild(
        tomato_wrapper
    )


    # ======================================
    # CARROT
    # ======================================

    carrot_button = create_node_button(
        carrot
    )

    carrot_button.id = "carrot-button"

    carrot_wrapper = document.createElement("div")

    carrot_wrapper.className = (
        "absolute "
        "top-[190px] left-[70%] "
        "-translate-x-1/2"
    )

    carrot_wrapper.appendChild(
        carrot_button
    )

    tree.appendChild(
        carrot_wrapper
    )


    # ======================================
    # GINGER
    # ======================================

    ginger_button = create_node_button(
        ginger
    )

    ginger_button.id = "ginger-button"

    ginger_wrapper = document.createElement("div")

    ginger_wrapper.className = (
        "absolute "
        "top-[190px] left-[85%] "
        "-translate-x-1/2"
    )

    ginger_wrapper.appendChild(
        ginger_button
    )

    tree.appendChild(
        ginger_wrapper
    )


    tree_area.appendChild(tree)
    panel.appendChild(tree_area)


    # ======================================
    # SELECTED TRAVERSAL
    # ======================================

    traversal_label = document.createElement("div")

    traversal_label.className = (
        "text-sm text-gray-300 "
        "mt-2 mb-2"
    )

    traversal_label.textContent = (
        "Selected Traversal:"
    )

    panel.appendChild(
        traversal_label
    )


    traversal_select = document.createElement("select")

    traversal_select.id = (
        "garden-traversal"
    )

    traversal_select.className = (
        "w-full bg-[#202938] "
        "border border-gray-600 "
        "text-white rounded-lg "
        "px-4 py-3"
    )


    for traversal in [
        "BFS",
        "Preorder",
        "Inorder",
        "Postorder"
    ]:

        option = document.createElement("option")

        option.value = traversal
        option.textContent = traversal

        traversal_select.appendChild(option)


    traversal_callback = create_proxy(
        change_traversal
    )

    traversal_select.addEventListener(
        "change",
        traversal_callback
    )

    tree_proxies.append(
        traversal_callback
    )

    panel.appendChild(
        traversal_select
    )


    # ======================================
    # RUN TRAVERSAL
    # ======================================

    run_button = document.createElement("button")

    run_button.className = (
        "w-full mt-3 px-4 py-3 "
        "rounded-lg "
        "bg-blue-600 "
        "hover:bg-blue-500 "
        "text-white font-bold"
    )

    run_button.textContent = (
        "🔄 Run Traversal"
    )


    def run_selected_traversal(event):

        nodes = get_traversal()

        order = []

        for node in nodes:

            order.append(
                f"{node.emoji} {node.name}"
            )

        display_output(
            f"<b>{selected_traversal}:</b> "
            + " → ".join(order)
        )


    run_callback = create_proxy(
        run_selected_traversal
    )

    run_button.addEventListener(
        "click",
        run_callback
    )

    tree_proxies.append(
        run_callback
    )

    panel.appendChild(
        run_button
    )


    # ======================================
    # GARDEN ACTIONS
    # ======================================

    action_label = document.createElement("div")

    action_label.className = (
        "text-sm text-gray-300 "
        "mt-5 mb-2"
    )

    action_label.textContent = (
        "Garden Actions:"
    )

    panel.appendChild(
        action_label
    )


    action_container = document.createElement("div")

    action_container.className = (
        "grid grid-cols-3 gap-2"
    )

    panel.appendChild(
        action_container
    )


    # ======================================
    # PLANT BUTTON
    # ======================================

    plant_button = document.createElement("button")

    plant_button.id = "plant-action-button"

    plant_button.className = (
        "bg-green-700 "
        "hover:brightness-110 "
        "text-white font-bold "
        "px-3 py-3 rounded-lg"
    )

    plant_button.textContent = "🌱 Plant"


    plant_callback = create_proxy(
        lambda event:
        perform_action("Plant")
    )

    plant_button.addEventListener(
        "click",
        plant_callback
    )

    tree_proxies.append(
        plant_callback
    )

    action_container.appendChild(
        plant_button
    )


    # ======================================
    # WATER BUTTON
    # ======================================

    water_button = document.createElement("button")

    water_button.id = "water-action-button"

    water_button.className = (
        "bg-blue-700 "
        "hover:brightness-110 "
        "text-white font-bold "
        "px-3 py-3 rounded-lg"
    )

    water_button.textContent = "💧 Water"


    water_callback = create_proxy(
        lambda event:
        perform_action("Water")
    )

    water_button.addEventListener(
        "click",
        water_callback
    )

    tree_proxies.append(
        water_callback
    )

    action_container.appendChild(
        water_button
    )


    # ======================================
    # STATUS
    # ======================================

    status = document.createElement("div")

    status.id = "tree-status"

    status.className = (
        "mt-4 p-3 rounded-lg "
        "bg-[#0d160e] "
        "text-emerald-300 text-sm"
    )

    status.textContent = (
        "🌱 Click Seed to begin."
    )

    panel.appendChild(status)


    # ======================================
    # OUTPUT
    # ======================================

    output_label = document.createElement("div")

    output_label.className = (
        "text-sm text-gray-300 "
        "mt-4 mb-2"
    )

    output_label.textContent = "Output:"

    panel.appendChild(output_label)


    output = document.createElement("div")

    output.id = "tree-output"

    output.className = (
        "bg-black/50 "
        "border border-emerald-900 "
        "rounded-xl "
        "p-3 "
        "text-sm "
        "min-h-[45px] "
        "font-mono"
    )

    panel.appendChild(output)


    # ======================================
    # INITIAL STATE
    # ======================================

    hide_all_choices()

    # Only Seed is visible initially.
    # Fruits/Vegetables and specific plants are hidden.


    # ======================================
    # ADD PANEL BELOW GARDEN GRID
    # ======================================

    game.appendChild(panel)


# ==========================================
# START
# ==========================================

create_tree_ui()

print("Click seed and choose a plant (Fruit or Vegetable).")

`
            },



            5: {
                title: "TOPIC 5: Binary Search Trees (BST) & Node Mutation",
                code: `# Topic 5: Binary Search Trees (BST) & Node Mutation
# ==== WRITE YOUR CODE HERE ====



`
            },



            6: {
                title: "TOPIC 6: Hash Tables, Collisions, & Rehashing",
                code: `# Topic 6: Hash Tables, Collisions, & Rehashing
# ==== WRITE YOUR CODE HERE ====


`
            },



            7: {
                title: "TOPIC 7: Graph Foundations, Adjacency Matrices/Lists, & DFS/BFS",
                code: `# Topic 7: Graph Foundations, Adjacency Matrices/Lists, & DFS/BFS
# ==== WRITE YOUR CODE HERE ====


`
            },



            8: {
                title: "TOPIC 8: Sorting Algorithms (Bubble, Insertion, Selection, Quick, & Merge Sort)",
                code: `# Topic 8: Sorting Algorithms (Bubble, Insertion, Selection, Quick, & Merge Sort)
# ==== WRITE YOUR CODE HERE ====


`
            },



            9: {
                title: "TOPIC 9: Searching Algorithms (Linear Search vs. Binary Search)",
                code: `# Topic 9: Searching Algorithms (Linear Search vs. Binary Search)
# ==== WRITE YOUR CODE HERE ====


`
            },



            10: {
                title: "TOPIC 10: Advanced Strategic Paradigms (Dijkstra's Algorithm & Greedy Patterns)",
                code: `# Topic 10: Advanced Strategic Paradigms (Dijkstra's Algorithm & Greedy Patterns)
# ==== WRITE YOUR CODE HERE ====


`
            },



            11: {
                title: "TOPIC 11: Dynamic Programming (DP), Memoization, & Divide-and-Conquer",
                code: `# Topic 11: Dynamic Programming (DP), Memoization, & Divide-and-Conquer
# ==== WRITE YOUR CODE HERE ====


`
            }
        };



        async function initPyodide() {
            const consoleEl = document.getElementById("output-console");
            if (pyodideInstance) return;
            if (consoleEl) {
                consoleEl.innerHTML = `<span class="text-amber-400">Loading Python...</span><br>`;
            }
            try {
                pyodideInstance = await loadPyodide();
                // Bridge functions Python may call (pure display — no game rules)
                pyodideInstance.globals.set("addPlantToGrid", addPlantToGrid);
                pyodideInstance.globals.set("updateResources", updateResources);
                pyodideInstance.globals.set("addPlantsToDropdown", addPlantsToDropdown);
                pyodideInstance.globals.set("pushAction", pushAction);
                pyodideInstance.globals.set("updateClimateQueue", updateClimateQueue);
                await pyodideInstance.runPythonAsync(`
import sys
import js
from js import document
class Console:
    def write(self, text):
        if text and text.strip():
            el = document.getElementById("output-console")
            if el:
                el.innerHTML += text.replace("\\n", "<br>")
    def flush(self): pass
sys.stdout = Console()
                `);
                if (consoleEl) {
                    consoleEl.innerHTML = `<span class="text-emerald-400">Python ready.</span><br>`;
                }
            } catch (err) {
                if (consoleEl) {
                    consoleEl.innerHTML = `<span class="text-red-400">Failed to load Python: ${err.message}</span>`;
                }
                throw err;
            }
        }

        // ---- Pure display bridges (called from Python) ----

        // updateClimateQueue(events, activeHazard)
        // Renders pending hazards and marks ONLY the active hazard in blinking red.
        function updateClimateQueue(events, activeHazard = "") {
            const container = document.getElementById("climate-queue");
            const alert = document.getElementById("climate-alert");
            const activeName = document.getElementById("active-hazard-name");
            const status = document.getElementById("climate-queue-status");
            const resolveButton = document.getElementById("resolve-hazard-btn");
            const processButton = document.getElementById("process-hazard-btn");
            const active = activeHazard ? String(activeHazard) : "";
            const items = events ? Array.from(events).map(String) : [];

            container.innerHTML = "";
            if (active) {
                alert.classList.remove("hidden");
                activeName.textContent = active;
                status.textContent = `${active} is active. Resolve it before processing the next hazard.`;
                resolveButton.disabled = false;
                processButton.disabled = true;
                processButton.classList.add("opacity-40", "cursor-not-allowed");
            } else {
                alert.classList.add("hidden");
                activeName.textContent = "No active hazard";
                resolveButton.disabled = true;
                processButton.disabled = items.length === 0;
                processButton.classList.toggle("opacity-40", items.length === 0);
                processButton.classList.toggle("cursor-not-allowed", items.length === 0);
                status.textContent = items.length
                    ? `Next in FIFO order: ${items[0]}. ${items.length} hazard(s) waiting.`
                    : "All climate hazards have been resolved. No hazards remain.";
            }

            if (!items.length) {
                const empty = document.createElement("div");
                empty.className = "rounded-xl border border-emerald-900/60 bg-[#1b2219] p-3 text-xs text-emerald-300/70";
                empty.textContent = "No hazards in queue.";
                container.appendChild(empty);
                return;
            }

            items.forEach((event, index) => {
                const isActive = active !== "" && event === active && index === 0;
                const div = document.createElement("div");
                div.className = isActive
                    ? "active-hazard-blink rounded-xl border p-3 text-xs"
                    : "rounded-xl border border-amber-900 bg-amber-950/40 p-3 text-xs";
                const title = document.createElement("div");
                title.className = isActive ? "font-extrabold text-red-100" : "font-bold text-amber-400";
                title.textContent = `${isActive ? "🚨 ACTIVE: " : ""}${event}`;
                const detail = document.createElement("div");
                detail.className = isActive ? "mt-1 text-red-200/90" : "mt-1 text-emerald-300/80";
                detail.textContent = isActive ? "Currently occurring — resolve before the next hazard." : `Queue position: ${index + 1}`;
                div.appendChild(title);
                div.appendChild(detail);
                container.appendChild(div);
            });
        }

        async function processNextClimateHazard() {
            if (!pyodideInstance) {
                showToast("Run Topic 2 Python code first.");
                return;
            }
            try {
                await pyodideInstance.runPythonAsync("process_next_hazard()");
            } catch (err) {
                showToast(`Could not process hazard: ${err.message}`);
            }
        }

        async function resolveActiveClimateHazard() {
            if (!pyodideInstance) {
                showToast("Run Topic 2 Python code first.");
                return;
            }
            try {
                await pyodideInstance.runPythonAsync("resolve_active_hazard()");
            } catch (err) {
                showToast(`Could not resolve hazard: ${err.message}`);
            }
        }

        // addPlantToGrid(pos: int 0-24, name: str)
        // Marks a grid cell as planted (display only).
        function addPlantToGrid(pos, name) {
            gardenPlants[pos] = name;
            renderGarden();
        }

        function renderGarden() {
            const grid = document.getElementById("garden-grid");
            grid.innerHTML = "";
            for (let i = 0; i < 25; i++) {
                const cell = document.createElement("div");
                cell.className = "aspect-square bg-[#2a3825] rounded-xl flex items-center justify-center text-3xl border border-emerald-800";
                cell.textContent = gardenPlants[i] ? "🌱" : "⬜";
                grid.appendChild(cell);
            }
        }


        // updateResources(water, seeds, energy, hope, coins)
        // Or pass a single object: updateResources({"water": n, "seeds": n, ...})
        // No fallbacks that turn a valid 0 into a default. Caps used only for bar width.
        function updateResources(water, seeds, energy, hope, coins) {
            if (typeof water === "object" && water !== null) {
                const args = water;
                water = args.water !== undefined ? args.water : 0;
                seeds = args.seeds !== undefined ? args.seeds : 0;
                energy = args.energy !== undefined ? args.energy : 0;
                hope = args.hope !== undefined ? args.hope : 0;
                coins = args.coins !== undefined ? args.coins : 0;
            } else {
                water = water !== undefined ? water : 0;
                seeds = seeds !== undefined ? seeds : 0;
                energy = energy !== undefined ? energy : 0;
                hope = hope !== undefined ? hope : 0;
                coins = coins !== undefined ? coins : 0;
            }
            const waterMax = 200, seedsMax = 100, energyMax = 120, hopeMax = 100;
            document.getElementById("water-text").innerText = `${water} / ${waterMax} L`;
            document.getElementById("water-bar").style.width = `${Math.min(100, (water / waterMax) * 100)}%`;
            document.getElementById("seeds-text").innerText = `${seeds} / ${seedsMax}`;
            document.getElementById("seeds-bar").style.width = `${Math.min(100, (seeds / seedsMax) * 100)}%`;
            document.getElementById("energy-text").innerText = `${energy} / ${energyMax} Wh`;
            document.getElementById("energy-bar").style.width = `${Math.min(100, (energy / energyMax) * 100)}%`;
            document.getElementById("hope-text").innerText = `${hope} / ${hopeMax}`;
            document.getElementById("hope-bar").style.width = `${Math.min(100, (hope / hopeMax) * 100)}%`;
            document.getElementById("coins-text").innerText = `${coins} Coins`;
        }

        // addPlantsToDropdown(plants: list of [name, emoji, cost])
        function addPlantsToDropdown(plants) {
            const select = document.getElementById("crop-selector");
            select.innerHTML = "";
            if (!plants) return;
            plants.forEach(([name, emoji, cost]) => {
                const option = document.createElement("option");
                option.value = name;
                option.textContent = `${emoji} ${name} (${cost}c)`;
                select.appendChild(option);
            });
        }

        // pushAction(action: str)
        // Appends a display label to the Action History panel (no JS undo logic).
        function pushAction(action) {
            displayActionHistory.push(action);
            if (displayActionHistory.length > 8) displayActionHistory.shift();
            renderActionStack();
        }

        function renderActionStack() {
            const container = document.getElementById("action-stack");
            container.innerHTML = "";
            [...displayActionHistory].reverse().forEach(act => {
                const div = document.createElement("div");
                div.className = "bg-emerald-950/60 border-l-2 border-amber-500 px-3 py-2 rounded text-xs text-emerald-100";
                div.textContent = `→ ${act}`;
                container.appendChild(div);
            });
        }

        // UI-only: removes the last displayed label. Your Python owns the real stack.
        function triggerUndo() {
            if (displayActionHistory.length > 0) {
                const undone = displayActionHistory.pop();
                renderActionStack();
                showToast(`Undid: ${undone}`);
            } else {
                showToast("Stack is empty.");
            }
        }

        function showToast(msg) {
            const toast = document.createElement("div");
            toast.className = "fixed bottom-6 right-6 bg-emerald-900 border border-emerald-400 text-white px-5 py-3 rounded-2xl shadow-2xl z-50 text-sm";
            toast.textContent = msg;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2500);
        }

        async function runPythonCode() {
            const consoleEl = document.getElementById("output-console");
            consoleEl.innerHTML = `<span class="text-amber-400">Running...</span><br>`;
            try {
                await initPyodide();
                const code = document.getElementById("code-editor").value.trim();
                await pyodideInstance.runPythonAsync(code);
            } catch (err) {
                consoleEl.innerHTML += `<span class="text-red-400">Error: ${err.message}</span>`;
            }
        }

        function loadTopic() {
            const key = document.getElementById("topic-selector").value;
            document.getElementById("code-editor").value = topicTemplates[key].code;
        }

        function switchTab(tab) {
            document.getElementById("view-game").classList.toggle("hidden", tab !== "game");
            document.getElementById("view-code").classList.toggle("hidden", tab !== "code");
            document.getElementById("tab-game").classList.toggle("bg-[#283623]", tab === "game");
            document.getElementById("tab-game").classList.toggle("text-emerald-100", tab === "game");
            document.getElementById("tab-code").classList.toggle("bg-[#283623]", tab === "code");
            document.getElementById("tab-code").classList.toggle("text-emerald-100", tab === "code");
        }

        window.onload = () => {
            document.getElementById("version-badge").textContent = "v" + APP_VERSION;
            lucide.createIcons();
            renderGarden();
            renderActionStack();
            // Resources stay at 0 until your Python calls updateResources(...)
            updateResources(0, 0, 0, 0, 0);

            const select = document.getElementById("topic-selector");
            Object.keys(topicTemplates).forEach(k => {
                const opt = document.createElement("option");
                opt.value = k;
                opt.textContent = topicTemplates[k].title;
                select.appendChild(opt);
            });
            loadTopic();
            switchTab("game");
            // Pre-load Pyodide in the background so the first Run is faster
            initPyodide().catch(() => {});
        };
