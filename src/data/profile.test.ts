import { describe, expect, it } from 'vitest'
import { profile } from './profile'

describe('profile', () => {
  it('contains only the approved public profile fields', () => {
    expect(profile).toEqual({
      name: 'Wenqin Zhou',
      email: '24049200434@stu.xidian.edu.cn',
      bio: '西电网信院大二',
      avatar: './avatar.jpg',
      avatarAlt: 'Wenqin Zhou 的头像',
    })
  })
})
