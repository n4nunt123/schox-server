let startDate = new Date()
let endDate

console.log(new Date())
console.log(startDate.getDate())
console.log(startDate.getDate() + 7)

// if (type == "weekly") 
// endDate = startDate.setDate(startDate.getDate() + 7) // disini harusnya dipikirin gimana kalo ditengah subs ada hari minggu
// else if (type == "monthly") 
endDate = startDate.setDate(startDate.getDate() + 30)

console.log(startDate.setDate((startDate.getDate() + 8)))
console.log(new Date(endDate))