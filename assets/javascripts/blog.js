'use strict';

import { FocusVisible } from './focus-visible.js';
import { CategoryNav } from './blog/category-nav.js';
import { FragmentScroll } from './blog/fragment-scroll.js';

const focusVisible = new FocusVisible();
const categoryNav = new CategoryNav('.category-nav');
const fragmentScroll = new FragmentScroll();
