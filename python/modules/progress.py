#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on: Friday December 17th of January 2020

Author: Daniel Cortild (https://github.com/DanielCortild)

ProgressBar Module
"""

import sys

def progress ( count, total, status1='', status2='', bar_len=30):
    filled_len = int( round( bar_len * count / float( total ) ) )

    percents = round( 100.0 * count / float( total ), 1 )
    bar = '#' * filled_len + '-' * ( bar_len - filled_len )

    sys.stdout.write( '%s [%s] %s\r' % (status1, bar, status2) )
    sys.stdout.flush()
