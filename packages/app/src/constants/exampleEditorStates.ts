export const matrixCalculationExample = {
  code_state: `#######################################################
  # Kite: An architecture simulator for five-stage      #
  # pipeline modeling of RISC-V instruction set         #
  # Developed by William J. Song                        #
  # School of Electrical Engineering, Yonsei University #
  # Version: 1.8                                        #
  #######################################################
  
  # Kite program code
  #   1. The first instruction starts at PC = 4. PC = 0 is reserved as invalid.
  #   2. To terminate the program, let the next PC naturally go out of range.
  #   3. All the instructions and labels are case-insensitive.
  #   4. The program code supports only the following list of instructions
  #      (sorted by alphabetical order in each type).
  #      R-type: add, and, div, divu, mul, or, rem, remu, sll, sra, srl, sub, xor
  #      I-type: addi, andi, jalr, slli, srai, srli, ld, ori, xori
  #      S-type: sd
  #      SB-type: beq, bge, blt, bne
  #      U-type: lui
  #      UJ-type: jal
  #      No-type: nop
  
  ####################
  ####################
  # This program runs matrix calculation of
  # C = C + A * B, where it is supposed that
  # C = [
  #  -6, 5, -8, 5, 9,
  #  1, 0, -6, 4, -2,
  #  -6, -5, -6, 6, -3,
  # ]
  #
  # A = [
  #  6, 5, 1, 8,
  #  2, 5, 9, -6,
  #  -9, 0, 0, 2
  # ]
  #
  # B = [
  #  2, -8, 1, 3, 7,
  #  5, -5, -5, 2, -7,
  #  -1, -3, 7, -2, 5,
  #  4, -7, -4, 6, 5
  # ]
  # Memory and register are set to work for these values accordingly as well.
  ####################
  ####################
  
  MAIN:
      # MAIN stack
      addi  x2,  x2, -64
      sd    x8,   0(x2)
      addi  x8,  x2,  64
      sd    x1,  -8(x8)
      sd   x10, -16(x8)
      sd   x11, -24(x8)
      sd   x12, -32(x8)
      sd   x13, -40(x8)
      sd   x14, -48(x8)
      sd   x15, -56(x8)
  
      # Address of matrix A = 1600 x11
      # Address of matrix B = 2400 x12
      # Address of matrix C = 3200 x10
      addi x10,  x0, 1600
      slli x10, x10,    1 # x10 = 3200
      addi x11,  x0, 1600 # x11 = 1600
      addi x12,  x0, 1200
      slli x12, x12,    1 # x12 = 2400
  
      # Matrix A = M (rows) * N (cols)
      # Matrix B = N (rows) * K (cols)
      # Matrix C = M (rows) * K (cols)
      # M = 3, N = 4, K = 5
      addi x13,  x0,   3
      addi x14,  x0,   4
      addi x15,  x0,   5
  
      # Call subroutine MMA(C, A, B, M, N, K)
      # C += A * B
      jal   x1, MMA
  
      # Clear MAIN stack
      ld    x1,  -8(x8)
      ld   x10, -16(x8)
      ld   x11, -24(x8)
      ld   x12, -32(x8)
      ld   x13, -40(x8)
      ld   x14, -48(x8)
      ld   x15, -56(x8)
      ld    x8,   0(x2)
      addi  x2,  x2,  64
  
      # End of the program (x1 == 0)
      jalr  x0, 0(x1)
  
  
  ################
  # Equivalent python code
  ################
  
  # i = 0
  # j = 0
  # k = 0
  # c_row = 0;
  # MATRIX_A_WIDTH = 4 # x14
  # MATRIX_A_HEIGHT = 3 # x13
  # MATRIX_B_WIDTH = 5 #x15 
  # 
  # while True:
  #   if k == MATRIX_B_WIDTH * MATRIX_A_HEIGHT:
  #     break
  #   C[k] = C[k] + A[i] * B[j]
  #   # i reaches the rightmost index of the row of A matrix
  #   if i != 0 and (i + 1) % (MATRIX_A_WIDTH) == 0:
  #     k += 1
  #     # handle next row of C
  #     if k % MATRIX_B_WIDTH == 0:
  #       # move i to the next row of matrix A
  #       c_row += 1
  #       i = ((c_row) * MATRIX_A_WIDTH)
  #       # locate j at the first column for a fresh multiplication
  #       j = 0
  #     # handle next element in the same row in C
  #     else:
  #       i = c_row * MATRIX_A_WIDTH
  #       j = k % MATRIX_B_WIDTH
  #   # i hasn't reached the rightmost index of the row of A matrix
  #   else:
  #     i += 1
  #     j += MATRIX_B_WIDTH
  
  # addi x13,  x0,   3
  # addi x14,  x0,   4
  # addi x15,  x0,   5
  # 1600 x11 A
  # 2400 x12 B
  # 3200 x10 C
  # X18–x27: saved registers
  # x5-x7, x28-x31: temp registers
  # Write MMA function that calculates C += A * B.
  MMA:
      # stack pointer for 3 items
      addi, x2,  x2, -24
      sd x18, 16(x2)
      sd x19, 8(x2)
      sd x20, 0(x2)
      # i: unsigned bit offset from 1600 (x11)
      # i = 0
      addi x5, x0, 0
      # j: unsigned bit offset from 2400 (x12) 
      # j = 0
      addi x6, x0, 0 
      # k: unsigned bit offset from 3200 (x10) 
      # k = 0
      addi x7, x0, 0
      # c_row: integer for marking nth row in matrix C (unit: row, not bytes)
      # c_row = 0
      addi x31, x0, 0
  
      beq x0, x0, MMA_MAIN    
  
  MMA_MAIN:
      # if k == MATRIX_B_WIDTH * MATRIX_A_HEIGHT:
      #    break
      mul x18, x13, x15
      srli x19, x7, 3
      beq x18, x19, MMA_EXIT
  
      # C[k] = C[k] + A[i] * B[j]
  
      # 1. Get A[i] (x18 = A[i])
      add x18, x5, x11 
      ld x18, 0(x18)
  
      # 2. Get B[j] (x19 = B[j])
      add x19, x6, x12
      ld x19, 0(x19)
  
      # 3. temp = A[i] * B[j]
      mul x18, x18, x19
  
      # 4. Get C[k]
      add x19, x10, x7
      ld x19, 0(x19)
  
      # 5. C[k] = C[k] + temp
      add x19, x19, x18
  
      add x18, x10, x7
      sd x19, 0(x18)
  
      # if i != 0 and (i + 1) % (MATRIX_A_WIDTH) == 0:
      beq x5, x0, ELSE
  
      # 1. Get (i + 1)
      addi x19, x5, 8
      # 2. Get MATRIX_A_WIDTH
      addi x20, x14, 0
      slli x20, x20, 3
      # 3. x18 = (i + 1) % (MATRIX_A_WIDTH)
      remu x18, x19, x20
      # 4. if x18 != x0: go to ELSE
      bne x18, x0, ELSE
          
      # k += 1
      addi x7, x7, 8
  
      # if k % MATRIX_B_WIDTH == 0:
      addi x18, x15, 0
      slli x18, x18, 3
      remu x18, x7, x18
      bne x0, x18, NESTED_ELSE
  
      # c_row += 1
      # i = ((c_row) * MATRIX_A_WIDTH)
      # j = 0
      # 1. c_row += 1
      addi x31, x31, 1
  
      # 2. i = ((c_row) * MATRIX_A_WIDTH)
      add x18, x0, x14
      slli x18, x18, 3
      mul x5, x31, x18
  
      # 3. j = 0
      addi x6, x0, 0
  
      # since this is a while loop, go back
      # to the start of the function
      beq x0, x0, MMA_MAIN
  
  ELSE:
      # else:
      #    i += 1
      #    j += MATRIX_B_WIDTH
      addi x5, x5, 8
      slli x18, x15, 3
      add x6, x6, x18
  
      # since this is a while loop, go back
      # to the start of the function
      beq x0, x0, MMA_MAIN
  
  NESTED_ELSE:
      # i = c_row * MATRIX_A_WIDTH
      add x19, x0, x14
      slli x19, x19, 3
      mul x5, x31, x19
  
      # j = k % MATRIX_B_WIDTH
      add x20, x0, x15
      slli x20, x20, 3
      remu x6, x7, x20
  
      # since this is a while loop, go back
      # to the start of the function
      beq x0, x0, MMA_MAIN
  
  MMA_EXIT:
      ld x20, 0(x2)
      ld x19, 8(x2)
      ld x18, 16(x2)
      addi, x2,  x2, 24
  
      jalr  x0, 0(x1)`,
  memory_state: `#######################################################
  # Kite: An architecture simulator for five-stage      #
  # pipeline modeling of RISC-V instruction set         #
  # Developed by William J. Song                        #
  # School of Electrical Engineering, Yonsei University #
  # Version: 1.8                                        #
  #######################################################
  
  # Kite memory state
  #   1. Each line of state file defines "memory address = data value".
  #   2. Data values cannot be floating-point but must be integers.
  #   3. Memory addresses and data defined in this file are sequentially
  #      stored in data memory.
  #   4. Not all memory addresses have to be listed in this file. Undefined
  #      memory addresses will zeros by default.
  
  1024 = 5
  1032 = -8
  1040 = -4
  1048 = 7
  1056 = -7
  1064 = 7
  1072 = -7
  1080 = -7
  1088 = 5
  1096 = 1
  1104 = 3
  1112 = -1
  1120 = -7
  1128 = -1
  1136 = 8
  1144 = 5
  1152 = 5
  1160 = -6
  1168 = -9
  1176 = -6
  1184 = 9
  1192 = -5
  1200 = -6
  1208 = 3
  1216 = -7
  1224 = -9
  1232 = 1
  1240 = 7
  1248 = 6
  1256 = -3
  1264 = -7
  1272 = 6
  1280 = -1
  1288 = -7
  1296 = -3
  1304 = -6
  1312 = -7
  1320 = 3
  1328 = 7
  1336 = -3
  1344 = 8
  1352 = -9
  1360 = 2
  1368 = -6
  1376 = 5
  1384 = 6
  1392 = -7
  1400 = 6
  1408 = 5
  1416 = 7
  1424 = -8
  1432 = -2
  1440 = 2
  1448 = -1
  1456 = 5
  1464 = 8
  1472 = -8
  1480 = 9
  1488 = -8
  1496 = 6
  1504 = -8
  1512 = 9
  1520 = -7
  1528 = -7
  1536 = 9
  1544 = -6
  1552 = -6
  1560 = 5
  1568 = -9
  1576 = 3
  1584 = -7
  1592 = 5
  1600 = 6
  1608 = 5
  1616 = 1
  1624 = 8
  1632 = 2
  1640 = 5
  1648 = 9
  1656 = -6
  1664 = -9
  1672 = 0
  1680 = 0
  1688 = 2
  1696 = -6
  1704 = 1
  1712 = -7
  1720 = 9
  1728 = 8
  1736 = 8
  1744 = 0
  1752 = -8
  1760 = 8
  1768 = 1
  1776 = 1
  1784 = -6
  1792 = -5
  1800 = -3
  1808 = -7
  1816 = 1
  1824 = -8
  1832 = 9
  1840 = -7
  1848 = 4
  1856 = 5
  1864 = -9
  1872 = 8
  1880 = -7
  1888 = -6
  1896 = 7
  1904 = 5
  1912 = 1
  1920 = -9
  1928 = 9
  1936 = -6
  1944 = -5
  1952 = -6
  1960 = 1
  1968 = 5
  1976 = -4
  1984 = 4
  1992 = -1
  2000 = -4
  2008 = -8
  2016 = -8
  2024 = -5
  2032 = -9
  2040 = -2
  2048 = -1
  2056 = 0
  2064 = -9
  2072 = 4
  2080 = 7
  2088 = -8
  2096 = -6
  2104 = -8
  2112 = 2
  2120 = 2
  2128 = -1
  2136 = 6
  2144 = -1
  2152 = -4
  2160 = 0
  2168 = -7
  2176 = 3
  2184 = -5
  2192 = 5
  2200 = 9
  2208 = 4
  2216 = -3
  2224 = 0
  2232 = -6
  2240 = -8
  2248 = -5
  2256 = 1
  2264 = -9
  2272 = -1
  2280 = 5
  2288 = 4
  2296 = 7
  2304 = 1
  2312 = -6
  2320 = 5
  2328 = -8
  2336 = 8
  2344 = -7
  2352 = -8
  2360 = 3
  2368 = 9
  2376 = -1
  2384 = 5
  2392 = -2
  2400 = 2
  2408 = -8
  2416 = 1
  2424 = 3
  2432 = 7
  2440 = 5
  2448 = -5
  2456 = -5
  2464 = 2
  2472 = -7
  2480 = -1
  2488 = -3
  2496 = 7
  2504 = -2
  2512 = 5
  2520 = 4
  2528 = -7
  2536 = -4
  2544 = 6
  2552 = 5
  2560 = 6
  2568 = 6
  2576 = 3
  2584 = -2
  2592 = 2
  2600 = 4
  2608 = 1
  2616 = -6
  2624 = 2
  2632 = 6
  2640 = -1
  2648 = 2
  2656 = 9
  2664 = -1
  2672 = -2
  2680 = -4
  2688 = -7
  2696 = 4
  2704 = 4
  2712 = -2
  2720 = -2
  2728 = -7
  2736 = -1
  2744 = -1
  2752 = -3
  2760 = -2
  2768 = -2
  2776 = -3
  2784 = 5
  2792 = 3
  2800 = -3
  2808 = 4
  2816 = -2
  2824 = 1
  2832 = 8
  2840 = 9
  2848 = 5
  2856 = 6
  2864 = 8
  2872 = -6
  2880 = 5
  2888 = 1
  2896 = -5
  2904 = -1
  2912 = 3
  2920 = -2
  2928 = -6
  2936 = -9
  2944 = -8
  2952 = 5
  2960 = 1
  2968 = 7
  2976 = -5
  2984 = -7
  2992 = 8
  3000 = 4
  3008 = 8
  3016 = -6
  3024 = 0
  3032 = 9
  3040 = 8
  3048 = -2
  3056 = -1
  3064 = 4
  3072 = 9
  3080 = -6
  3088 = 5
  3096 = 5
  3104 = 4
  3112 = -8
  3120 = 0
  3128 = -2
  3136 = 2
  3144 = -8
  3152 = 2
  3160 = 5
  3168 = 5
  3176 = 2
  3184 = -9
  3192 = 6
  3200 = -6
  3208 = 5
  3216 = -8
  3224 = 5
  3232 = 9
  3240 = 1
  3248 = 0
  3256 = -6
  3264 = 4
  3272 = -2
  3280 = -6
  3288 = -5
  3296 = -6
  3304 = 6
  3312 = -3
  3320 = -7
  3328 = -3
  3336 = 9
  3344 = 1
  3352 = -9
  3360 = -2
  3368 = -4
  3376 = 1
  3384 = -8
  3392 = -5
  3400 = -6
  3408 = 8
  3416 = 9
  3424 = 5
  3432 = -8
  3440 = -1
  3448 = 0
  3456 = 7
  3464 = 2
  3472 = -5
  3480 = 8
  3488 = 2
  3496 = 4
  3504 = 4
  3512 = -2
  3520 = 8
  3528 = 5
  3536 = -9
  3544 = -6
  3552 = -2
  3560 = -8
  3568 = -7
  3576 = 2
  3584 = -5
  3592 = 2
  3600 = -9
  3608 = 2
  3616 = -5
  3624 = -6
  3632 = -1
  3640 = 8
  3648 = -1
  3656 = 4
  3664 = -6
  3672 = 2
  3680 = -6
  3688 = 6
  3696 = 5
  3704 = -9
  3712 = -5
  3720 = -3
  3728 = 5
  3736 = 1
  3744 = -4
  3752 = -2
  3760 = -6
  3768 = 3
  3776 = -5
  3784 = -5
  3792 = -1
  3800 = 4
  3808 = 5
  3816 = 4
  3824 = -4
  3832 = 5
  3840 = 7
  3848 = -4
  3856 = -7
  3864 = -7
  3872 = 6
  3880 = -7
  3888 = 8
  3896 = -3
  3904 = 9
  3912 = 7
  3920 = 9
  3928 = -4
  3936 = 8
  3944 = 4
  3952 = -4
  3960 = -9
  3968 = -1
  3976 = 1
  3984 = -1
  3992 = 8
  4000 = -3
  4008 = -4
  4016 = 0
  4024 = -7
  4032 = 3
  4040 = -2
  4048 = 9
  4056 = -2
  4064 = 1
  4072 = -9
  4080 = -6
  4088 = -3
  `,
  reg_state: `#######################################################
  # Kite: An architecture simulator for five-stage      #
  # pipeline modeling of RISC-V instruction set         #
  # Developed by William J. Song                        #
  # School of Electrical Engineering, Yonsei University #
  # Version: 1.8                                        #
  #######################################################
  
  # Kite register state
  #   1. Each line of state file defines "register name = data value".
  #   2. Register state can define only 32 integer registers (e.g., x31).
  #   3. x0 register is hard-wired to zero. Any non-zero values written to x0
  #      register is discarded.
  
  x0 = 0
  x1 = 0
  x2 = 4000
  x3 = 3
  x4 = 4
  x5 = 5
  x6 = 6
  x7 = 7
  x8 = 8
  x9 = 9
  x10 = 10
  x11 = 11
  x12 = 12
  x13 = 13
  x14 = 14
  x15 = 15
  x16 = 16
  x17 = 17
  x18 = 18
  x19 = 19
  x20 = 20
  x21 = 21
  x22 = 22
  x23 = 23
  x24 = 24
  x25 = 25
  x26 = 26
  x27 = 27
  x28 = 28
  x29 = 29
  x30 = 30
  x31 = 31
  `,
}
