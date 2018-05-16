---
layout: post
title: Parallel computing with HDF5, MPI and Python
date: 2018-05-16
comments: true
analytics: false
keywords: parallel, HDF5, MPI, python
description: how I installed parallel HDF5 for use in Python with MPI
tag: parallel, HDF5, MPI
category: parallel, HDF5, MPI
---

My previous post about Tensorflow gave me some ideas.

Let's do parallel computing the right way. Let's use HDF5 along with MPI for parallel processing.

Here's what I did to get the system up and running on my MAC OS.

I'm sure it is a hack job, but it works!

## Step 1. Install openmpi

I downloaded version 2.04 of openmpi from https://www.open-mpi.org/software/ompi/v2.0/

After, I went to terminal, and did,

```
tar xf openmpi-2.0.4.tar.gz
cd openmpi-2.0.4/
./configure --prefix=$HOME/openmpi/
make all
make install
$HOME/mpirun/mpirun --version

mpirun (Open MPI) 2.0.4.
```
For some reason that created an opt/ folder in my $HOME path.

Whatever.

## Step 2. install HDF5, the parallel version

Next, I installed the HDF5 parallel version:

```
CC=$HOME/mpicc ./configure --with-zlib=/usr/local/opt --disable-fortran --prefix=$HOME --enable-shared --enable-parallel
make
make check
sudo make install
h5pcc -showconfig
```

## Step 3. install mpi4py

I installed mpi4py via,
```
env MPICC=$HOME/mpicc pip install mpi4py
```
    HDF5_PARAPREFIX=/PFS/user/me
    export HDF5_PARAPREFIX
    make check


## Step 4. h5py

Last, I uninstalled my older version of h5py via,
```
pip uninstall h5py
```
 and then i reinstalled via,
 ```
CC="mpicc" HDF5_MPI="ON" HDF5_DIR=/usr/local/bin/ pip install --no-binary=h5py h5py
```

# Step 5. Testing

```
from mpi4py import MPI
print "Hello World (from process %d)" % MPI.COMM_WORLD.Get_rank()
```
<div>
Hello World (from process 0)
</div>


```
import h5py
print h5py.version.info
```
<div>
Summary of the h5py configuration
---------------------------------

h5py    2.7.1
HDF5    1.10.2
Python  2.7.12 |Anaconda custom (x86_64)| (default, Jul  2 2016, 17:43:17)
[GCC 4.2.1 (Based on Apple Inc. build 5658) (LLVM build 2336.11.00)]
sys.platform    darwin
sys.maxsize     9223372036854775807
numpy   1.13.3
</div>


```
rank = MPI.COMM_WORLD.rank  # The process ID (integer 0-3 for 4-process run)

f = h5py.File('parallel_test.hdf5', 'w', driver='mpio', comm=MPI.COMM_WORLD)

dset = f.create_dataset('test', (4,), dtype='i')
dset[rank] = rank

f.close()
```
```
import os
print os.listdir(os.getcwd())
```
<div>
parallel_test.hdf5
</div>

## Conclusion

The first output looks like everything works as planned! I hope the same sort of logic will apply on the Ubuntu computer at Helix!!
