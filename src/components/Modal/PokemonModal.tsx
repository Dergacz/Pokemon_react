import React, { FC } from 'react';
import { Button, Modal, Text } from '@nextui-org/react';
import { setColor } from '../../../utils/setColor';
import { IPokemon } from '../../models/models';
import { IPokemonModal } from './PokemonModal.types';

export const PokemonModal: FC<IPokemonModal> = ({
  pokemon,
  bindings,
  setVisible,
  color,
  favorText,
}) => {
  return (
    <div>
      <Button css={{ backgroundColor: `${setColor(color)}`, marginTop: '20px' }} onPress={() => setVisible(true)}>
        Read description
      </Button>
      <Modal
        scroll
        width="90%"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18} css={{ textTransform: 'capitalize' }}>
            {pokemon.name}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description">
            {favorText}
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button color="error" onPress={() => setVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
