"use strict";
var shopList = [];
var isEditing = false;
var globalId = 0;
var addInput = document.querySelector("#add-input");
var addButton = document.querySelector("#add-button");
var shopListContainer = document.querySelector(".items-list");
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", () => {
    addItem(addInput === null || addInput === void 0 ? void 0 : addInput.value);
    renderAllItems();
    addInput.value = "";
});
function addItem(name) {
    var item = {
        id: globalId,
        name,
    };
    globalId += 1;
    shopList = [...shopList, item];
}
function removeItem(idToRemove) {
    shopList = shopList.filter((listItem) => listItem.id !== idToRemove);
}
function editItem(idToEdit, name) {
    var newItem = {
        id: idToEdit,
        name,
    };
    const otherItems = shopList.filter((shopItem) => shopItem.id !== idToEdit);
    shopList = [...otherItems, newItem].sort((a, b) => a.id - b.id);
}
function addEvents() {
    var deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((deleteItemButton) => {
        deleteItemButton.addEventListener("click", () => {
            const itemToDelete = deleteItemButton.dataset.id;
            if (itemToDelete) {
                removeItem(Number(itemToDelete));
            }
            renderAllItems();
        });
    });
    var editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editItemButton) => {
        editItemButton.addEventListener("click", () => {
            const itemToEdit = editItemButton.dataset.id;
            if (itemToEdit) {
                startEditAction(Number(itemToEdit));
            }
        });
    });
    var confirmButtons = document.querySelectorAll(".confirm-edit");
    confirmButtons.forEach((confirmItemButton) => {
        confirmItemButton.addEventListener("click", () => {
            const itemToConfirm = confirmItemButton.dataset.id;
            const itemInput = document.querySelector(`[id='${itemToConfirm}'] input`);
            editItem(Number(itemToConfirm), itemInput.value);
            endEditAction(Number(itemToConfirm));
            renderAllItems();
        });
    });
}
function startEditAction(id) {
    const itemName = document.querySelector(`[id='${id}'] .item-name`);
    const itemInput = document.querySelector(`[id='${id}'] .edit-item-input`);
    const itemNormalActions = document.querySelector(`[id='${id}'] .item-actions .normal-actions`);
    const itemEditActions = document.querySelector(`[id='${id}'] .item-actions .edit-actions`);
    itemName === null || itemName === void 0 ? void 0 : itemName.classList.add("hidden");
    itemInput === null || itemInput === void 0 ? void 0 : itemInput.classList.remove("hidden");
    itemNormalActions === null || itemNormalActions === void 0 ? void 0 : itemNormalActions.classList.add("hidden");
    itemEditActions === null || itemEditActions === void 0 ? void 0 : itemEditActions.classList.remove("hidden");
    const itemToEdit = shopList.find((shopItem) => shopItem.id === Number(id));
    if (itemInput) {
        itemInput.value = (itemToEdit === null || itemToEdit === void 0 ? void 0 : itemToEdit.name) || "";
    }
}
function endEditAction(id) {
    const itemName = document.querySelector(`[id='${id}'] .item-name`);
    const itemInput = document.querySelector(`[id='${id}'] .edit-item-input`);
    const itemNormalActions = document.querySelector(`[id='${id}'] .item-actions .normal-actions`);
    const itemEditActions = document.querySelector(`[id='${id}'] .item-actions .edit-actions`);
    itemName === null || itemName === void 0 ? void 0 : itemName.classList.remove("hidden");
    itemInput === null || itemInput === void 0 ? void 0 : itemInput.classList.add("hidden");
    itemNormalActions === null || itemNormalActions === void 0 ? void 0 : itemNormalActions.classList.remove("hidden");
    itemEditActions === null || itemEditActions === void 0 ? void 0 : itemEditActions.classList.add("hidden");
    if (itemInput) {
        itemInput.value = "";
    }
}
function renderAllItems() {
    const noItemsMessage = document.querySelector(".no-items-message");
    if (shopListContainer) {
        shopListContainer.innerHTML = "";
    }
    if (shopList.length > 0) {
        noItemsMessage === null || noItemsMessage === void 0 ? void 0 : noItemsMessage.classList.add("hidden");
        shopList.forEach((listItem) => {
            renderItem(listItem);
        });
        addEvents();
    }
    else {
        noItemsMessage === null || noItemsMessage === void 0 ? void 0 : noItemsMessage.classList.remove("hidden");
    }
}
function renderItem(item) {
    var li = document.createElement("li");
    li.classList.add("shop-item");
    li.id = String(item.id);
    var itemContent = `
    <div>
      <span class="item-name">${item.name}</span>
      <input type="text" class="edit-item-input hidden" data-id=${item.id} />
    </div>
    <div class="item-actions">
      <div class="normal-actions">
        <img
          class="icon edit"
          data-id=${item.id}
          src="assets/icons/shop_list/edit.svg"
          alt="Editar"
        />
        <img
          class="icon delete"
          data-id=${item.id}
          src="assets/icons/shop_list/trash.svg"
          alt="Deletar"
        />
      </div>
      <div class="edit-actions hidden">
        <img
          class="icon confirm-edit"
          data-id=${item.id}
          src="assets/icons/shop_list/check.svg"
          alt="Salvar edição"
        />
      </div>
    </div>
  `;
    li.innerHTML = itemContent;
    shopListContainer === null || shopListContainer === void 0 ? void 0 : shopListContainer.appendChild(li);
}
renderAllItems();
