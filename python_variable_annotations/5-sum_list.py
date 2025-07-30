#!/usr/bin/env python3
"""Fonction qui somme une liste de floats avec annotations de type."""
from typing import List


def sum_list(input_list: List[float]) -> float:
    """Retourne la somme des éléments de input_list en float."""
    return float(sum(input_list))
