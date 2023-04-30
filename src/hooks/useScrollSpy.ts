/*
Copy and modify from
https://gist.github.com/iDVB/a041da210605f05e0b36ac03ed403c00
*/
import { useEffect, useRef, useState } from 'react';

import { Heading } from '@/components/TableOfContent/TableOfContent';

import useThrottledOnScroll from './useThrottledOnScroll';

export type ScrollSpyItem = Heading & {
  node?: HTMLElement;
};
const useScrollSpy = (
  items: ScrollSpyItem[],
  options?: {
    offset?: number;
  }
) => {
  const { offset = 0 } = options || {};
  const itemsWithNodeRef = useRef<ScrollSpyItem[]>([]);

  useEffect(() => {
    itemsWithNodeRef.current = getItemsClient(items);
  }, [items]);

  const [activeState, setActiveState] = useState<string | null>(null);

  const findActiveIndex = () => {
    let active;
    for (let i = itemsWithNodeRef.current.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 30) {
        active = { id: null };
        break;
      }

      const item = itemsWithNodeRef.current[i];

      if (process.env.NODE_ENV !== 'production') {
        if (!item.node) {
          console.error(
            `Missing node on the item ${JSON.stringify(item, null, 2)}`
          );
        }
      }

      if (
        item.node &&
        item.node.offsetTop !== 0 &&
        item.node.offsetTop <= document.documentElement.scrollTop + offset + 1
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.id) {
      setActiveState(active.id);
    }
  };

  useThrottledOnScroll(items.length > 0 ? findActiveIndex : null, 150);

  return activeState;
};

const getItemsClient = (items: ScrollSpyItem[]) =>
  items.map(item => ({
    ...item,
    node: document.getElementById(item.id)
  })) as ScrollSpyItem[];

export default useScrollSpy;
