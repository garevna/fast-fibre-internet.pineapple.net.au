import { shallowMount } from '@vue/test-utils'
import CardsShow from '@/components/CardsShow.vue'

describe('CardsShow.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(CardsShow, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
