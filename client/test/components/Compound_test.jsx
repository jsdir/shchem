import React from 'react'
import { mount } from 'enzyme'

import { expect } from 'chai'

import SearchResults from '../../components/SearchResults'

describe('Components::SearchResults', () => {
  it('renders', () => {
    const wrapper = mount(
      <SearchResults />
    )
    expect(wrapper.exists()).to.eq(true)
  })
})
