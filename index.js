
// let bubbleMilkTea = new Drink('Bubble Milk Tea', 'No Sugar', 'Less Ice')
// let blackTea = new Drink('Black Tea', 'Half Sugar', 'No Ice')
// let lemonGreenTea = new Drink('Lemon Green Tea', 'No Sugar', 'Less Ice')
// let matchaLatte = new Drink('Matcha Latte', 'Less Sugar', 'Regular Ice')


const alphaPos = new AlphaPos()

const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')
addDrinkButton.addEventListener('click', function () {
  // 1. 取得店員選擇的飲料品項、甜度和冰塊
  const drinkName = alphaPos.getCheckedValue('drink')
  const ice = alphaPos.getCheckedValue('ice')
  const sugar = alphaPos.getCheckedValue('sugar')
  
  // 2. 如果沒有選擇飲料品項，跳出提示
  if (!drinkName) {
    alert('Please choose at least one item.')
    return
  }
  // 3. 建立飲料實例，並取得飲料價格
  const drink = new Drink(drinkName, sugar, ice)
  // 4. 將飲料實例產生成左側訂單區的畫面
  alphaPos.addDrink(drink)
})
function AlphaPos() {}
AlphaPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`[name=${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}
// 4.
const orderLists = document.querySelector('[data-order-lists]')
AlphaPos.prototype.addDrink = function (drink) {
  let orderListsCard = `
    <div class="card mb-3">
    <div class="card-body pt-3 pr-3">
      <div class="text-right">
        <span data-alpha-pos="delete-drink">×</span>
      </div>
      <h6 class="card-title mb-1">${drink.name}</h6>
      <div class="card-text">${drink.ice}</div>
      <div class="card-text">${drink.sugar}</div>
    </div>
    <div class="card-footer text-right py-2">
      <div class="card-text text-muted">$ <span data-drink-price>${drink.price()}</span></div>
    </div>
  </div>
  `

  orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}

orderLists.addEventListener('click', function (event) {
  let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]')
  if (!isDeleteButton) {
    return
  }
  // delete the card element
  alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
})

AlphaPos.prototype.deleteDrink = function (target) {
  target.remove()
}

AlphaPos.prototype.checkout = function () {
  let totalAmount = 0
  document.querySelectorAll('[data-drink-price]').forEach(function (drink) {
    totalAmount += Number(drink.textContent)
  })
  return totalAmount
}

AlphaPos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(function (card) {
    card.remove()
  })
}

const checkoutButton = document.querySelector('[data-alpha-pos="checkout"]')
checkoutButton.addEventListener('click', function () {
  // 1. 計算訂單總金額
  alert(`Total amount of drinks：$${alphaPos.checkout()}`)
  // 2. 清空訂單
  alphaPos.clearOrder(orderLists)
})

function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}

Drink.prototype.price = function () {
  switch (this.name) {
    case '古早紅茶':
    case '古早奶茶':
    case '鮮奶茶':
    case '英式奶茶':
      return 30
    case '水果茶':
    case '森林莓果茶':
      return 50
    case '研磨咖啡':
    case '山藥薏仁':
      return 55
    default:
      alert('No this drink')
  }
}
