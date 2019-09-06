import React from 'react'
import { DappHeader } from 'components/common'
import { Button } from '@linkdrop/ui-kit'
import styles from './styles.module'
import { translate, actions } from 'decorators'

@actions(({ user: { ens } }) => ({ ens }))
@translate('pages.dappConfirm')
class DappConfirm extends React.Component {
  render () {
    return <div className={styles.container}>
      <DappHeader
        title={this.t('titles.wallet')}
        onClose={_ => console.log('here is the close event')}
      />

      <div className={styles.content}>
        <div
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: this.t('titles.confirmAction', { dappName: 'Swap Tokens' }) }}
        />
        <Button
          className={styles.button}
          onClick={_ => console.log('here is the continue event')}
        >
          {this.t('buttons.confirm')}
        </Button>
      </div>
      <div
        className={styles.footer}
        dangerouslySetInnerHTML={{ __html: this.t('texts.dapp') }}
      />
    </div>
  }
}

export default DappConfirm
