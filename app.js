class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()   //default values as soon as we create a new calculator 
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined //since they don't have any operation selected if we clear things
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
    //In a function, this refers to the global object.
    appendNumber(number) {//essentially what's going to happen every single time a user clicks on
        if (number === '.' && this.currentOperand.includes('.')) return //will stop it from going any further
        this.currentOperand = this.currentOperand.toString() + number.toString() // 1+1 = 2 instead of 11; appended not added
    }
    //we need fancier math here
    chooseOperation(operation) { //4 operation choices
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') { // is the logical opposite of the strict equality operator.
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)//the actual number version of our previous operate operand right here so
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {//a switch statement is very much llike a bunch of if statement chained after each other
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
            default:
                return

        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    //this function is just going to return that number but converted
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }


    updateDisplay() {
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) { //not equal to
        this.previousOperandTextElement.innerText = 
        `${this.previousOperand} ${this.operation}`
    
        }  else {
            this.previousOperandTextElement.innerText = '' //operand value on top clears itself
        }          
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//constructor
//new = which is how you define classes; new followed by the class name
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) 

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })

  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })

