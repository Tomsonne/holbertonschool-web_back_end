#!/usr/bin/env python3
"""bip bip """


def insert_school(mongo_collection, **kwargs):
    """bip bip"""
    result = mongo_collection.insert_one(kwargs)
    return result.inserted_id
