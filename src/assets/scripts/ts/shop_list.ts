interface ShopListItemType {
  id: number;
  name: string;
}

type ShopListType = ShopListItemType[];

var shopList: ShopListType = [];
var isEditing = false;
var globalId = 0;

var addInput = document.querySelector("#add-input") as HTMLInputElement;
var addButton = document.querySelector("#add-button");
var shopListContainer = document.querySelector(".items-list");

addButton?.addEventListener("click", () => {
  addItem(addInput?.value);
  renderAllItems();
  addInput.value = "";
});

function addItem(name: string) {
  // Adiciona o item na lista de itens global
  var item = {
    id: globalId,
    name,
  };
  globalId += 1;

  shopList = [...shopList, item];
}

function removeItem(idToRemove: number) {
  // Filtrando todos os itens que não tenham o id do item a ser removido
  shopList = shopList.filter((listItem) => listItem.id !== idToRemove);
}

/**
 * Editar item no shopList
 * @param {*} idToEdit
 * @param {*} name
 */
function editItem(idToEdit: number, name: string) {
  var newItem = {
    id: idToEdit,
    name,
  };

  const otherItems = shopList.filter((shopItem) => shopItem.id !== idToEdit);

  shopList = [...otherItems, newItem].sort((a, b) => a.id - b.id);
}

function addEvents() {
  // Selecionar todos os elementos com classe .delete
  var deleteButtons = document.querySelectorAll(
    ".delete"
  ) as NodeListOf<HTMLElement>;
  // Percorrer o array de elementos
  deleteButtons.forEach((deleteItemButton) => {
    // Adicionar o evento de delete
    deleteItemButton.addEventListener("click", () => {
      const itemToDelete = deleteItemButton.dataset.id;
      if (itemToDelete) {
        removeItem(Number(itemToDelete));
      }
      renderAllItems();
    });
  });

  // Selecionar todos os elementos com classe .edit
  var editButtons = document.querySelectorAll(
    ".edit"
  ) as NodeListOf<HTMLElement>;
  // Percorrer o array de elementos
  editButtons.forEach((editItemButton) => {
    // Adicionar o evento de edição
    editItemButton.addEventListener("click", () => {
      const itemToEdit = editItemButton.dataset.id;
      if (itemToEdit) {
        startEditAction(Number(itemToEdit));
      }
    });
  });

  // Selecionar todos os elementos com class .confirm-edit
  var confirmButtons = document.querySelectorAll(
    ".confirm-edit"
  ) as NodeListOf<HTMLElement>;
  confirmButtons.forEach((confirmItemButton) => {
    // Adicionar o evento de coinfirmar a edição
    confirmItemButton.addEventListener("click", () => {
      const itemToConfirm = confirmItemButton.dataset.id;
      const itemInput = document.querySelector(
        `[id='${itemToConfirm}'] input`
      ) as HTMLInputElement;
      editItem(Number(itemToConfirm), itemInput.value);
      endEditAction(Number(itemToConfirm));
      renderAllItems();
    });
  });
}

function startEditAction(id: number) {
  // Selecionar os elementos
  const itemName = document.querySelector(`[id='${id}'] .item-name`);
  const itemInput = document.querySelector(
    `[id='${id}'] .edit-item-input`
  ) as HTMLInputElement;
  const itemNormalActions = document.querySelector(
    `[id='${id}'] .item-actions .normal-actions`
  );
  const itemEditActions = document.querySelector(
    `[id='${id}'] .item-actions .edit-actions`
  );

  // Esconder e mostrar as ações, iniciando o editar
  itemName?.classList.add("hidden");
  itemInput?.classList.remove("hidden");
  itemNormalActions?.classList.add("hidden");
  itemEditActions?.classList.remove("hidden");

  // Achar item e colocar valor no input
  const itemToEdit = shopList.find((shopItem) => shopItem.id === Number(id));
  if (itemInput) {
    itemInput.value = itemToEdit?.name || "";
  }
}

function endEditAction(id: number) {
  // Selecionar os elementos
  const itemName = document.querySelector(`[id='${id}'] .item-name`);
  const itemInput = document.querySelector(
    `[id='${id}'] .edit-item-input`
  ) as HTMLInputElement;
  const itemNormalActions = document.querySelector(
    `[id='${id}'] .item-actions .normal-actions`
  );
  const itemEditActions = document.querySelector(
    `[id='${id}'] .item-actions .edit-actions`
  );

  // Esconder e mostrar as ações, finalizando o editar
  itemName?.classList.remove("hidden");
  itemInput?.classList.add("hidden");
  itemNormalActions?.classList.remove("hidden");
  itemEditActions?.classList.add("hidden");

  // Zerar input de editar
  if (itemInput) {
    itemInput.value = "";
  }
}

function renderAllItems() {
  const noItemsMessage = document.querySelector(".no-items-message");
  // Zerar os itens na tela
  if (shopListContainer) {
    shopListContainer.innerHTML = "";
  }
  // Renderizar todos os itens na tela
  if (shopList.length > 0) {
    noItemsMessage?.classList.add("hidden");
    shopList.forEach((listItem) => {
      renderItem(listItem);
    });
    addEvents();
  } else {
    noItemsMessage?.classList.remove("hidden");
  }
}

function renderItem(item: ShopListItemType) {
  // Criando o li e adicionando as propriedades
  var li = document.createElement("li");
  li.classList.add("shop-item");
  li.id = String(item.id);

  // Adicionando conteúdo
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

  // Adiciona o item no container
  shopListContainer?.appendChild(li);
}

renderAllItems();
