const TREE_CONTAINER = document.getElementById("tree-container");
const ADD_NODE_BUTTON = document.getElementById("add-node");
const NODE_TYPE_SELECT = document.getElementById("node-type");
const NODE_VALUE_INPUT = document.getElementById("node-value");
const SEARCH_NODE_INPUT = document.getElementById("search-node");
const UPDATE_NODE_BUTTON = document.getElementById("update-node");
const DELETE_NODE_BUTTON = document.getElementById("delete-node");

let selectedNode = null;

// Function to create a new node element
function createNodeElement(value) {
  const li = document.createElement("li");
  li.innerText = value;
  li.addEventListener("click", () => {
    selectNode(li);
    UPDATE_NODE_BUTTON.disabled = false;
    DELETE_NODE_BUTTON.disabled = false;
  });
  return li;
}

// Function to add a child node to a parent node
function addChildNode(parentNode, childNode) {
  if (!parentNode.querySelector("ul")) {
    const ul = document.createElement("ul");
    parentNode.appendChild(ul);
  }
  parentNode.querySelector("ul").appendChild(childNode);
}

// Function to clear the selected node
function clearSelectedNode() {
  if (selectedNode) {
    selectedNode.classList.remove("selected-node");
    selectedNode = null;
    UPDATE_NODE_BUTTON.disabled = true;
    DELETE_NODE_BUTTON.disabled = true;
    NODE_VALUE_INPUT.value = "";
  }
}

// Function to select a node
function selectNode(node) {
  clearSelectedNode();
  selectedNode = node;
  selectedNode.classList.add("selected-node");
  NODE_VALUE_INPUT.value = selectedNode.innerText;
}

// Function to search for nodes by name
function searchNodes() {
  const searchTerm = SEARCH_NODE_INPUT.value.toLowerCase();
  const nodes = TREE_CONTAINER.querySelectorAll("li");
  for (const node of nodes) {
    if (node.innerText.toLowerCase().includes(searchTerm)) {
      node.style.display = "block";
    } else {
      node.style.display = "none";
    }
  }
}

// Add event listeners
ADD_NODE_BUTTON.addEventListener("click", () => {
  const nodeType = NODE_TYPE_SELECT.value;
  const nodeValue = NODE_VALUE_INPUT.value;
  if (!nodeValue || !nodeType) {
    alert("Please select a node type and enter a value.");
    return;
  }
  const newNode = createNodeElement(nodeValue);
  if (nodeType === "single") {
    TREE_CONTAINER.appendChild(newNode);
  } else if (nodeType === "child" && selectedNode) {
    addChildNode(selectedNode, newNode);
  } else if (nodeType === "parent" && selectedNode) {
    const parentNode = document.createElement("li");
    parentNode.innerText = nodeValue;
    parentNode.appendChild(selectedNode);
    TREE_CONTAINER.appendChild(parentNode);
  }
  NODE_VALUE_INPUT.value = "";
});

SEARCH_NODE_INPUT.addEventListener("keyup", () => searchNodes());

UPDATE_NODE_BUTTON.addEventListener("click", () => {
  if (selectedNode) {
    selectedNode.innerText = NODE_VALUE_INPUT.value;
  }
});

DELETE_NODE_BUTTON.addEventListener("click", () => {
  if (selectedNode && !confirm("Are you sure you want to delete this node?")) {
    return;
  }
  selectedNode.parentNode.removeChild(selectedNode);
  clearSelectedNode();
});

// Initialize the application
clearSelectedNode();
UPDATE_NODE_BUTTON.disabled = true;
DELETE_NODE_BUTTON.disabled = true;
