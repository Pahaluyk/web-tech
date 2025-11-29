// База данных всех блюд
const dishes = [
    // Бургеры
    {
        keyword: 'whopper',
        name: 'Воппер',
        price: 320,
        category: 'burger',
        count: '290 г',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500'
    },
    {
        keyword: 'cheeseburger',
        name: 'Чизбургер',
        price: 180,
        category: 'burger',
        count: '170 г',
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500'
    },
    {
        keyword: 'bacon-cheeseburger',
        name: 'Бекон Чизбургер',
        price: 240,
        category: 'burger',
        count: '210 г',
        image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500'
    },
    {
        keyword: 'chickenburger',
        name: 'Чикенбургер',
        price: 200,
        category: 'burger',
        count: '190 г',
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500'
    },
    {
        keyword: 'double-cheeseburger',
        name: 'Двойной Чизбургер',
        price: 280,
        category: 'burger',
        count: '250 г',
        image: 'https://avatars.mds.yandex.net/i?id=ef99f8ef02978c1ecdd0e7f86c0a6c85_l-10136989-images-thumbs&n=13'
    },
    {
        keyword: 'vegetarian-burger',
        name: 'Вегетарианский бургер',
        price: 260,
        category: 'burger',
        count: '230 г',
        image: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=500'
    },

    // Картофель и закуски
    {
        keyword: 'fries',
        name: 'Картофель фри',
        price: 120,
        category: 'side',
        count: '150 г',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500'
    },
    {
        keyword: 'country-fries',
        name: 'Картофель по-деревенски',
        price: 140,
        category: 'side',
        count: '180 г',
        image: 'https://avatars.mds.yandex.net/i?id=5bb7e9947a1e344c97fc9fa4632135029d033df1-4101447-images-thumbs&n=13'
    },
    {
        keyword: 'onion-rings',
        name: 'Луковые кольца',
        price: 160,
        category: 'side',
        count: '130 г',
        image: 'https://avatars.mds.yandex.net/i?id=7a441da832ec72928ce6af648789dfd17913fdd1-5492576-images-thumbs&n=13'
    },
    {
        keyword: 'nuggets',
        name: 'Наггетсы (6 шт)',
        price: 190,
        category: 'side',
        count: '150 г',
        image: 'https://avatars.mds.yandex.net/i?id=22dc7e851e3ff7365786fc7fd84c0d9500ffa68d-4032389-images-thumbs&n=13'
    },
    {
        keyword: 'cheese-sticks',
        name: 'Сырные палочки',
        price: 170,
        category: 'side',
        count: '120 г',
        image: 'https://avatars.mds.yandex.net/i?id=e4781a605fbadca2af717bba5a6065b579ddb509-5220345-images-thumbs&n=13'
    },
    {
        keyword: 'wings',
        name: 'Куриные крылышки',
        price: 250,
        category: 'side',
        count: '200 г',
        image: 'https://avatars.mds.yandex.net/i?id=a529338c5faa0674145b4016fb676a4bcac78369-5733920-images-thumbs&n=13'
    },

    // Напитки
    {
        keyword: 'mojito',
        name: 'Мохито',
        price: 110,
        category: 'drink',
        count: '500 мл',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500'
    },
    {
        keyword: 'cola',
        name: 'Coca-Cola',
        price: 110,
        category: 'drink',
        count: '500 мл',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500'
    },
    {
        keyword: 'sprite',
        name: 'Sprite',
        price: 110,
        category: 'drink',
        count: '500 мл',
        image: 'https://avatars.mds.yandex.net/get-entity_search/5542822/1219809935/SUx182_2x'
    },
    {
        keyword: 'ice-tea',
        name: 'Айс Ти персик',
        price: 90,
        category: 'drink',
        count: '500 мл',
        image: 'https://avatars.mds.yandex.net/i?id=f17dc81ddc5778209ad6ca6858b51e55869acf66-5505574-images-thumbs&n=13'
    },
    {
        keyword: 'milkshake',
        name: 'Молочный коктейль',
        price: 180,
        category: 'drink',
        count: '400 мл',
        image: 'https://avatars.mds.yandex.net/i?id=b70a1f2863d5d05c9d685bab5f6b6811e05689b9-12540153-images-thumbs&n=13'
    },
    {
        keyword: 'americano',
        name: 'Американо',
        price: 130,
        category: 'drink',
        count: '300 мл',
        image: 'https://avatars.mds.yandex.net/i?id=34ee84edbae3b086bef87c9d407863ce12d03656-12714984-images-thumbs&n=13'
    }
];