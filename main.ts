function CreatePlayer () {
    mySprite = sprites.create(assets.image`Ship`, SpriteKind.Player)
    mySprite.setPosition(77, 103)
    controller.moveSprite(mySprite, 100, 0)
    missle = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . a . . . . . . . . 
        . . . . . . a a a . . . . . . . 
        . . . . . . a 1 a . . . . . . . 
        . . . . . a a 1 a a . . . . . . 
        . . . . . a 1 a 1 a . . . . . . 
        . . . . . a 1 a 1 a . . . . . . 
        . . . . . a 1 a 1 a . . . . . . 
        . . . . . a 1 a 1 a . . . . . . 
        . . . . . a 1 a 1 a . . . . . . 
        . . . . . a 1 a 1 a . . . . . . 
        . . . . . a 1 a 1 a . . . . . . 
        . . . . . a a 1 a a . . . . . . 
        . . . . . . a 1 a . . . . . . . 
        . . . . . . a a a . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
    missle.setPosition(74, mySprite.y - 15)
    scroller.scrollBackgroundWithSpeed(0, 30)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    missle.vy = -200
    missle.ay = -200
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    sprites.destroy(mySprite, effects.disintegrate, 500)
    sprites.destroy(sprite)
    sprites.destroy(missle)
    info.changeLifeBy(-1)
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    target = sprites.create(assets.image`target`, SpriteKind.Enemy)
    gravity += 5
    target.y = -10
    target.ay = gravity
})
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    pause(500)
    CreatePlayer()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(target, effects.disintegrate, 500)
})
let missle: Sprite = null
let mySprite: Sprite = null
let gravity = 0
let target: Sprite = null
let amplitude = 50
let cycleTimeMillis = 2000
scene.setBackgroundImage(assets.image`sky1`)
CreatePlayer()
target = sprites.create(assets.image`target`, SpriteKind.Enemy)
target.y = 0
gravity = 5
target.ay = gravity
info.setLife(3)
game.onUpdate(function () {
    missle.x = mySprite.x
    if (missle.y <= 0) {
        missle.setPosition(mySprite.x, mySprite.y - 15)
        missle.ay = 0
        missle.vy = 0
    }
    target.x = scene.screenWidth() / 2 + amplitude * Math.sin(2 * (3.14 * (game.runtime() / cycleTimeMillis)))
    if (target.y > 120) {
        target.y = 0
    }
})
