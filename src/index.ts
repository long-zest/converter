// internal data types
type ShopingItemType = {
    title: string
    price: number
    currency: string
    date: string
}
interface INodeElement {
    firstName: string
    lastName: string
    age: number
    birthDate: string
    shoppingItemsList?: ShopingItemType[]
}
type Chat = {
    title: string
    nodesList: INodeElement[]
}

// external data types
type Timestamp = {
    seconds: number
    nanos: number
}
type ExtShopingItemType = {
    Title: string
    Price: number
    Currency: string
    Date: Timestamp
}
interface IExtNodeElement {
    FirstName: string
    LastName: string
    Age: number
    BirthDate: Timestamp
    ShoppingItems: ExtShopingItemType[]
}
type ExtChat = {
    Title: string
    ChatItems: IExtNodeElement[]
}

// Convert internal data to external data function
function convertToExtChat(chat: Chat): ExtChat {
    return {
        Title: chat.title,
        ChatItems: chat.nodesList.map(node => ({
            FirstName: node.firstName,
            LastName: node.lastName,
            Age: node.age,
            BirthDate: convertToTimeStamp(node.birthDate),
            ShoppingItems: node.shoppingItemsList?.map(item => ({
                Title: item.title,
                Price: item.price,
                Currency: item.currency,
                Date: convertToTimeStamp(item.date)
            })) || []
        }))
    };
}

// Convert string to timestamp function
function convertToTimeStamp(dateString: string): Timestamp {
    const date = new Date(dateString);
    return { 
        seconds: Math.floor(date.getTime() / 1000),
        nanos: date.getMilliseconds() * 1000000
    };
}

// Example usage
const testChat: Chat = {
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