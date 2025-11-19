const dishes = [
    {
        keyword: "mushroom-soup",
        name: "Грибной крем-суп",
        price: 280,
        category: "soup",
        count: "300 мл",
        image: "img/soup/mushroom-soup.jpg",
        kind: "veg"
    },
    {
        keyword: "beet-soup",
        name: "Традиционный борщ",
        price: 240,
        category: "soup",
        count: "350 мл",
        image: "img/soup/beet-soup.jpg",
        kind: "meat"
    },
    {
        keyword: "chicken-noodle-soup",
        name: "Куриный бульон с лапшой",
        price: 220,
        category: "soup",
        count: "350 мл",
        image: "img/soup/chicken-noodle-soup.jpg",
        kind: "meat"
    },
    {
        keyword: "minestrone-soup",
        name: "Итальянский суп минестроне",
        price: 260,
        category: "soup",
        count: "350 мл",
        image: "img/soup/minestrone-soup.jpg",
        kind: "veg"
    },
    {
        keyword: "tomato-soup",
        name: "Томатный крем-суп",
        price: 250,
        category: "soup",
        count: "300 мл",
        image: "img/soup/tomato-soup.jpg",
        kind: "veg"
    },
    {
        keyword: "pumpkin-soup",
        name: "Тыквенный суп с имбирем",
        price: 270,
        category: "soup",
        count: "300 мл",
        image: "img/soup/pumpkin-soup.jpg",
        kind: "veg"
    },
    {
        keyword: "fish-soup",
        name: "Уха из лосося",
        price: 320,
        category: "soup",
        count: "350 мл",
        image: "img/soup/fish-soup.jpg",
        kind: "fish"
    },
    {
        keyword: "seafood-soup",
        name: "Суп том-ям с морепродуктами",
        price: 340,
        category: "soup",
        count: "350 мл",
        image: "img/soup/seafood-soup.jpg",
        kind: "fish"
    },
    {
        keyword: "french-onion-soup",
        name: "Французский луковый суп",
        price: 300,
        category: "soup",
        count: "350 мл",
        image: "img/soup/french-onion-soup.jpg",
        kind: "veg"
    },
    {
        keyword: "vegan-bowl-chickpeas",
        name: "Веганский боул с нутом",
        price: 390,
        category: "main-course",
        count: "350 г",
        image: "img/main-dishes/vegan-bowl-chickpeas.jpg",
        kind: "veg"
    },
    {
        keyword: "grilled-chicken-vegetables",
        name: "Куриная грудка с овощами гриль",
        price: 450,
        category: "main-course",
        count: "350 г",
        image: "img/main-dishes/grilled-chicken-vegetables.jpg",
        kind: "meat"
    },
    {
        keyword: "salmon-quinoa-avocado",
        name: "Лосось с киноа и авокадо",
        price: 620,
        category: "main-course",
        count: "380 г",
        image: "img/main-dishes/salmon-quinoa-avocado.jpg",
        kind: "fish"
    },
    {
        keyword: "seafood-pasta",
        name: "Паста с морепродуктами",
        price: 550,
        category: "main-course",
        count: "330 г",
        image: "img/main-dishes/seafood-pasta.jpg",
        kind: "fish"
    },
    {
        keyword: "teriyaki-chicken-noodles",
        name: "Рисовая лапша с курицей терияки",
        price: 420,
        category: "main-course",
        count: "340 г",
        image: "img/main-dishes/teriyaki-chicken-noodles.jpg",
        kind: "meat"
    },
    {
        keyword: "beef-salad",
        name: "Теплый салат с говядиной",
        price: 490,
        category: "main-course",
        count: "320 г",
        image: "img/main-dishes/beef-salad.jpg",
        kind: "meat"
    },
    {
        keyword: "vegetable-stir-fry",
        name: "Овощное рагу с тофу",
        price: 380,
        category: "main-course",
        count: "350 г",
        image: "img/main-dishes/vegetable-stir-fry.jpg",
        kind: "veg"
    },
    {
        keyword: "duck-orange-sauce",
        name: "Утка в апельсиновом соусе",
        price: 580,
        category: "main-course",
        count: "360 г",
        image: "img/main-dishes/duck-orange-sauce.jpg",
        kind: "meat"
    },
    {
        keyword: "mushroom-risotto",
        name: "Ризотто с белыми грибами",
        price: 410,
        category: "main-course",
        count: "340 г",
        image: "img/main-dishes/mushroom-risotto.jpg",
        kind: "veg"
    },
    {
        keyword: "berry-juice",
        name: "Ягодный морс",
        price: 120,
        category: "drink",
        count: "300 мл",
        image: "img/drinks/berry-juice.jpg",
        kind: "cold"
    },
    {
        keyword: "water",
        name: "Минеральная вода",
        price: 80,
        category: "drink",
        count: "500 мл",
        image: "img/drinks/water.jpg",
        kind: "cold"
    },
    {
        keyword: "spinach-smoothie",
        name: "Зеленый смузи с шпинатом",
        price: 180,
        category: "drink",
        count: "350 мл",
        image: "img/drinks/spinach-smoothie.jpg",
        kind: "cold"
    },
    {
        keyword: "ginger-lemonade",
        name: "Имбирный лимонад",
        price: 140,
        category: "drink",
        count: "300 мл",
        image: "img/drinks/ginger-lemonade.jpg",
        kind: "cold"
    },
    {
        keyword: "mango-smoothie",
        name: "Смузи манго-маракуйя",
        price: 170,
        category: "drink",
        count: "350 мл",
        image: "img/drinks/mango-smoothie.jpg",
        kind: "cold"
    },
    {
        keyword: "orange-juice",
        name: "Свежевыжатый апельсиновый сок",
        price: 150,
        category: "drink",
        count: "300 мл",
        image: "img/drinks/orange-juice.jpg",
        kind: "cold"
    },
    {
        keyword: "cappuccino",
        name: "Капучино",
        price: 150,
        category: "drink",
        count: "300 мл",
        image: "img/drinks/cappuccino.jpg",
        kind: "hot"
    },
    {
        keyword: "green-tea",
        name: "Зеленый чай",
        price: 100,
        category: "drink",
        count: "400 мл",
        image: "img/drinks/green-tea.jpg",
        kind: "hot"
    },
    {
        keyword: "hot-chocolate",
        name: "Горячий шоколад",
        price: 160,
        category: "drink",
        count: "300 мл",
        image: "img/drinks/hot-chocolate.jpg",
        kind: "hot"
    },
    {
        keyword: "shrimp-salad",
        name: "Салат с креветками и авокадо",
        price: 380,
        category: "salad",
        count: "250 г",
        image: "img/salads/shrimp-salad.jpg",
        kind: "fish"
    },
    {
        keyword: "caesar-salad",
        name: "Цезарь с курицей",
        price: 320,
        category: "salad",
        count: "280 г",
        image: "img/salads/caesar-salad.jpg",
        kind: "meat"
    },
    {
        keyword: "greek-salad",
        name: "Греческий салат",
        price: 280,
        category: "salad",
        count: "260 г",
        image: "img/salads/greek-salad.jpg",
        kind: "veg"
    },
    {
        keyword: "caprese-salad",
        name: "Капрезе с моцареллой",
        price: 290,
        category: "salad",
        count: "240 г",
        image: "img/salads/caprese-salad.jpg",
        kind: "veg"
    },
    {
        keyword: "quinoa-salad",
        name: "Салат с киноа и овощами",
        price: 310,
        category: "salad",
        count: "270 г",
        image: "img/salads/quinoa-salad.jpg",
        kind: "veg"
    },
    {
        keyword: "beetroot-salad",
        name: "Салат со свеклой и орехами",
        price: 260,
        category: "salad",
        count: "250 г",
        image: "img/salads/beetroot-salad.jpg",
        kind: "veg"
    },
    {
        keyword: "chocolate-mousse",
        name: "Шоколадный мусс",
        price: 180,
        category: "dessert",
        count: "100 г",
        image: "img/desserts/chocolate-mousse.jpg",
        kind: "small"
    },
    {
        keyword: "panna-cotta",
        name: "Панна-котта с ягодным соусом",
        price: 200,
        category: "dessert",
        count: "120 г",
        image: "img/desserts/panna-cotta.jpg",
        kind: "small"
    },
    {
        keyword: "lemon-tart",
        name: "Лимонный тарт",
        price: 190,
        category: "dessert",
        count: "110 г",
        image: "img/desserts/lemon-tart.jpg",
        kind: "small"
    },
    {
        keyword: "cheesecake",
        name: "Чизкейк Нью-Йорк",
        price: 280,
        category: "dessert",
        count: "150 г",
        image: "img/desserts/cheesecake.jpg",
        kind: "medium"
    },
    {
        keyword: "tiramisu",
        name: "Тирамису классический",
        price: 290,
        category: "dessert",
        count: "160 г",
        image: "img/desserts/tiramisu.jpg",
        kind: "medium"
    },
    {
        keyword: "chocolate-cake",
        name: "Шоколадный торт",
        price: 350,
        category: "dessert",
        count: "200 г",
        image: "img/desserts/chocolate-cake.jpg",
        kind: "large"
    }
];