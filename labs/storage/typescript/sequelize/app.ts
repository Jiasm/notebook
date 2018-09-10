/* eslint-disable import/no-extraneous-dependencies,no-new */

import path from 'path'
import { Sequelize } from 'sequelize-typescript'
import Animal from './models/animal'
import Dog from './models/dog'
import Bird from './models/bird'
// , Dog, Bird

const sequelize = new Sequelize('mysql://root:jarvis@127.0.0.1:3306/ts_test')
//                             dialect://username:password@host:port/db_name

sequelize.addModels([path.resolve(__dirname, `./models/`)]);
(async () => {
  try {
    const animalList = await Animal.getList()
    const dogList = await Dog.getList<Dog>()

    console.log(animalList)
    console.log(dogList)

    // console.log(dogList[0].leg)

    // Animal.create<Animal>({
    //   name: 'Niko',
    //   weight: 19,
    // })

    process.exit(0)
  } catch (e) {
    console.error(e)
  }
})()