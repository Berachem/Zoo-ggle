#! /usr/bin/env python3

from typing import Callable

def load_class(descriptor):
    import importlib
    """Load a class described with a string 'path.to.the.module.NameOfTheClass'"""
    try:
        dot_pos = descriptor.rfind('.')
        module = descriptor[0:dot_pos]
        klass_name = descriptor[dot_pos+1:]
    except AttributeError:
        raise ValueError("Cannot load class with descriptor: {}".format(descriptor))
    loaded_module = importlib.import_module(module)
    loaded_class = getattr(loaded_module, klass_name)
    return loaded_class
    
def nonify_exception(to_be_called: Callable, print_exc=False):
    try:
        return to_be_called()
    except:
        if print_exc:
            import traceback
            traceback.print_exc()
        return None

async def cancel_and_get_result(task, default=None):
    task.cancel()
    try:
        return await task
    except:
        return default