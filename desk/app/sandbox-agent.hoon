
|%
+$  versioned-state
    $%  state-0
    ==
+$  state-0
  $:  %0
      test-string=cord
  ==
--
=|  state-0
=*  state  -
%-  agent:dbug
^-  agent:gall
=<
  |_  =bowl:gall
  ++  on-init
    ^-  (quip card _this)
    =.  test-string.state  'world'
    :-  ~  this
  ::
  ++  on-save   !>(~)
  ++  on-load   |=(vase `..on-init)
  ++  on-poke   |=(cage !!)
  ++  on-watch  |=(path !!)
  ++  on-leave  |=(path `..on-init)
  ++  on-peek   |=(path ~)
  ++  on-agent  |=([wire sign:agent:gall] !!)
  ++  on-arvo   |=([wire sign-arvo] !!)
  ++  on-fail   |=([term tang] `..on-init)
  --
|_  [=bowl:gall cards=(list card)]