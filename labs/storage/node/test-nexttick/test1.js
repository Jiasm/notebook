function main () {
  console.log(1)
  process.nextTick(() => {
    console.log(3)
  })
  process.nextTick(() => {
    console.log(4)
  })
  console.log(2)
}

main()