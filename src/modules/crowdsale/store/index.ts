import { Module } from 'vuex'
import bcCrowdsale from './crowdsale'

const crowdsaleStores: Record<string, Module<any, any>> = {
  bcCrowdsale
}

export default crowdsaleStores
