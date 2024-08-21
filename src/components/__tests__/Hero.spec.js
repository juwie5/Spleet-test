/**
 * @vitest-enviroment happy-dom
 */

import { vi } from 'vitest';
import { describe, it, expect, test } from 'vitest'

import { mount } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils';
import Hero from '../Hero.vue'

describe('import vue components', () => {
  test('normal imports as expected', async()=>{
    const cmp = await import('../Hero.vue');
    expect(cmp).toBeDefined();
  })
});

describe('Hero', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(Hero)
     expect(wrapper.text()).toContain("Ready to Rock? Discover the Hottest Events Here – Your Calendar's New Best Friend!")
  })
})