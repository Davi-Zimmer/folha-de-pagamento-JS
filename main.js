const prompt = require("prompt-sync")();
const workerList = []

function addWorker( name, id, role, hourlyRate ){
    const worker = {
        name, id, role, hourlyRate,
        hours: []
    }

    workerList.push( worker )

}

function getWorker( id ){
    return workerList.find(elm => elm.id == id)
}

function registerHours( id, workedHours ){
    const worker = getWorker( id )

    worker.hours.push( workedHours )
}

function calculateMonthlySalary( worker ){
   
    const salary = worker.hourlyRate * worker.hours.reduce((lot, value) => lot + value, 0)

    return salary
}

function range( current, less, greater ){
    return current > less && current > greater
}

function calculeINSS( worker ){
    
    const salary = calculateMonthlySalary( worker )

    let inss = 0

    if( salary < 1412 )                   inss = salary * .075; else 
    if( range(salary, 1412.01, 2666.68) ) inss = salary * .09; else 
    if( range(salary, 2666.69, 4000.03) ) inss = salary * .12; else 
    if( salary > 4000.04 )                inss = salary * .14

    inss = Math.min(908.85, inss)

    return inss
}

function geratePaymentReport( worker ){
    const {name, role, hours} = worker

    const totalHours = hours.reduce((lot, val) => lot + val, 0)

    const inss = calculeINSS( worker )

    const salary = calculateMonthlySalary( worker )

    const salaryLiquid = salary - inss

    const a = `
        Nome: ${name}
        Cargo: ${role}
        Total de horas: ${totalHours}
        Valor do INSS: ${inss}
        Salário bruto: ${ salary.toFixed(2) }
        Salário Líquido: ${ salaryLiquid }
    `

    console.log( a )
}

function handlePaymentReport() {

    let n;
    
    do {

        console.clear()

        console.log('1 Adicionar funcionario')
        console.log('2 Registrar horas trabalhadas')
        console.log('3 Exibir relatório de pagamento')
        console.log('4 Sair')

        n = prompt("Digite a opção desejada: ");

        switch( n ){
            case '1' :
                {
                    let name = prompt('Digite o nome do usuário: ')
                    let role = prompt('Digite o cargo do usuário: ')
                    let hourlyRate = prompt('Digite a carga horária do usuário: ')

                    let id = workerList.length

                    addWorker(name, id, role, hourlyRate)
                }
            break;

            case '2' :
                {
                    let id = prompt('Digite o id do usuário: ')
                    let hours = prompt('Digite a quantia de horas: ')

                    registerHours( id, hours )
                }

            break;

            case '3' :
                let id = prompt('Digite o id do usuário :')
                const worker = getWorker( id )
                geratePaymentReport( worker )

            break;
            
        }

    } while ( n != '4' )


}

handlePaymentReport()


// addWorker('chorão', 1, 'cringe', 10)
// registerHours(1, 8)
// registerHours(1, 6)
// console.log(  geratePaymentReport( workerList[0]) )