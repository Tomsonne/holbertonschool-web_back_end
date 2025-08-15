#!/usr/bin/env python3
"""bip bip"""


def update_topics(mongo_collection, name, topics):
    """bip bip"""
    mongo_collection.update_many(
        { "name": name },
        { "$set": { "topics": topics } }
    )
