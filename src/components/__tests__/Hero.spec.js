/**
 * @vitest-enviroment happy-dom
 */

import { vi } from 'vitest';
import { describe, it, expect, test } from 'vitest'

import { mount } from '@vue/test-utils'
import Hero from '../Hero.vue'

 vi.mock('vue-router', () => ({
  resolve: vi.fn(),
}));


describe('import vue components', () => {
  test('normal imports as expected', async()=>{
    const cmp = await import('../Hero.vue');
    expect(cmp).toBeDefined();
  })
});

describe('Hero', () => {
  it('should render correctly', () => {
    const wrapper = mount(Hero)
     expect(wrapper.html()).toContain("Ready to Rock? Discover the Hottest Events Here – YourCalendar's New Best Friend!")
  })
})