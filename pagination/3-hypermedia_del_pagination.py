#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict, Any


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """bip bip"""
        if index is None:
            index = 0

        assert isinstance(index, int)
        assert isinstance(page_size, int) and page_size > 0
        # Validate range against original dataset length
        assert 0 <= index < len(self.dataset())

        indexed = self.indexed_dataset()
        data: List[List] = []
        collected = 0
        current = index

        if not indexed:
            return {"index": index, "data": [], "page_size": 0, "next_index": index}

        max_pos = max(indexed.keys())

        # Collect page_size existing items, skipping deleted indices
        while collected < page_size and current <= max_pos:
            item = indexed.get(current)
            if item is not None:
                data.append(item)
                collected += 1
            current += 1

        return {
            "index": index,
            "data": data,
            "page_size": len(data),
            "next_index": current
        }

