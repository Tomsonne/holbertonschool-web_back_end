#!/usr/bin/env python3
"""bip bip"""


def schools_by_topic(mongo_collection, topic):
    """bip bip"""
    return list(mongo_collection.find({"topics": topic}))
