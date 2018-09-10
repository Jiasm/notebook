import { Table, Column } from 'sequelize-typescript'
import Animal from './animal'

@Table({
  tableName: 'dog'
})
export default class Dog extends Animal {
  @Column
  leg: number
}
