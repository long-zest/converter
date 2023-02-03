"use strict";
function convertToExtChat(chat) {
    return {
        Title: chat.title,
        ChatItems: chat.nodesList.map(node => {
            var _a;
            return ({
                FirstName: node.firstName,
                LastName: node.lastName,
                Age: node.age,
                BirthDate: convertToTimeStamp(node.birthDate),
                ShoppingItems: ((_a = node.shoppingItemsList) === null || _a === void 0 ? void 0 : _a.map(item => ({
                    Title: item.title,
                    Price: item.price,
                    Currency: item.currency,
                    Date: convertToTimeStamp(item.date)
                }))) || []
            });
        })
    };
}
function convertToTimeStamp(dateString) {
    const date = new Date(dateString);
    return {
        seconds: Math.floor(date.getTime() / 1000),
        nanos: date.getMilliseconds() * 1000000
    };
}
const testChat = {
    title: 'Test',
    nodesList: [
        {
            firstName: 'John',
            lastName: 'Doe',
            age: 30,
            birthDate: '1990-01-01',
            shoppingItemsList: [
                {
                    title: 'item 1',
                    price: 10,
                    currency: 'USD',
                    date: '2022-01-01'
                },
                {
                    title: 'item 2',
                    price: 20,
                    currency: 'EUR',
                    date: '2022-02-01'
                }
            ]
        },
        {
            firstName: 'Jane',
            lastName: 'Doe',
            age: 25,
            birthDate: '1995-01-01'
        }
    ]
};
const extChat = convertToExtChat(testChat);
console.log(extChat);
