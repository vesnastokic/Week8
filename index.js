// Serbian foof menu
class FoodItem {
    constructor(name, description) {
      this.name = name;
      this.description = description;
    }
  
    describe() {
      return `${this.name}: ${this.description}`;
    }
  }
  
  class MenuCategory {
    constructor(name) {
      this.name = name;
      this.items = [];
    }
  
    addItem(item) {
      if (item instanceof FoodItem) {
        this.items.push(item);
      } else {
        throw new Error(`You can only add an instance of FoodItem. 
        argument is not a food item: ${item}`);
      }
    }
  
    describe() {
      return `${this.name} has ${this.items.length} items.`;
    }
  }
  
  class SerbianMenu {
    constructor() {
      this.categories = [];
      this.selectedCategory = null;
    }
  
    start() {
      let selection = this.showMainMenuOptions(); 
      while (selection !== '0') {
        switch(selection) {
          case '1':
            this.createCategory();
            break;
          case '2':
            this.viewCategory();
            break;
          case '3':
            this.deleteCategory();
            break;
          case '4':
            this.displayCategories();
            break;
          default:
            selection = '0';
        }
        selection = this.showMainMenuOptions();
      }
      alert('Goodbye!');
    }
  
    showMainMenuOptions() {
      return prompt(`
      0) Exit
      1) Create a new category
      2) View a category
      3) Delete a category
      4) Display all categories
      `);
    }
  
    showCategoryMenuOptions(categoryInfo) {
      return prompt(`
      0) Back
      1) Add a new item
      2) Delete an item
      -----------------
      ${categoryInfo}
      `);
    }
  
    displayCategories() {
      let categoryString = '';
      for (let i = 0; i < this.categories.length; i++) {
        categoryString += i + ') ' + this.categories[i].name + '\n';
      }
      alert(categoryString);
    }
  
    createCategory() {
      let name = prompt('Enter name for new category: ');
      this.categories.push(new MenuCategory(name));
    }
  
    viewCategory() {
      let index = prompt("Enter the index of the category that you want to view:");
      if (index > -1 && index < this.categories.length) {
        this.selectedCategory = this.categories[index];
        let description = 'Category: ' + this.selectedCategory.name + '\n';
        description += ' ' + this.selectedCategory.describe() + '\n ';
        for (let i = 0; i < this.selectedCategory.items.length; i++) {
          description += i + ') ' + this.selectedCategory.items[i].describe() + '\n';
        }
        let selection1 = this.showCategoryMenuOptions(description);
        switch (selection1) {
          case '1':
            this.createItem();
            break;
          case '2':
            this.deleteItem();
            break;
        }
      } 
    }
  
    deleteCategory() {
      let index = prompt('Enter the index of the category that you wish to delete: ');
      if (index > -1 && index < this.categories.length) {
        this.categories.splice(index, 1);
      }
    }
  
    createItem() {
      let name = prompt('Enter name for new item: ');
      let description = prompt('Enter description for new item: ');
      this.selectedCategory.addItem(new FoodItem(name, description));
    }
  
    deleteItem() {
      let index = prompt('Enter the index of the item that you wish to delete: ');
      if (index > -1 && index < this.selectedCategory.items.length) {
        this.selectedCategory.items.splice(index, 1);
      }
    }
  }
  
  let menu = new SerbianMenu();
  menu.start();