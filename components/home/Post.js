/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {postFooterIcons} from '../../data/postFooterIcons';
import {firebase, db} from '../../config/firebase';

const Post = ({post, currentUser}) => {
  const [pressState, setPressState] = React.useState({});
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);

  const handleComment = comment => {
    console.log(comment);
    db.collection('users')
      .doc(post.owner_email)
      .collection('posts')
      .doc(post.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          user: currentUser.username,
          comment: comment,
        }),
      })
      .then(() => {
        console.log('updated');
      })
      .catch(e => {
        console.log(e);
      });
    setShowComment(false);
    setComment('');
  };
  const handleLike = () => {
    const currentLikeSatus = !post.liked_by_users.includes(
      firebase.auth().currentUser.email,
    );
    db.collection('users')
      .doc(post.owner_email)
      .collection('posts')
      .doc(post.id)
      .update({
        liked_by_users: currentLikeSatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email,
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email,
            ),
      })
      .then(() => {
        console.log('updated');
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <View style={{marginBottom: 30}}>
      <View
        style={{
          borderBottomColor: '#808080',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <PostHeader post={post} />
      <TouchableOpacity
        onPress={() => {
          var delta = new Date().getTime() - pressState.lastPress;

          if (delta < 200) {
            handleLike(post);
          }

          setPressState({
            lastPress: new Date().getTime(),
          });
        }}>
        <PostImage post={post} />
      </TouchableOpacity>
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <PostFooter
          post={post}
          handleLike={handleLike}
          setShowComment={() => {
            setShowComment(true);
          }}
        />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection
          post={post}
          setShowCommentSection={setShowCommentSection}
          showCommentSection={showCommentSection}
        />
        {showCommentSection ? <Comments post={post} /> : null}

        {showComment ? (
          <TextInput
            onChange={e => setComment(e.nativeEvent.text)}
            style={{color: 'white', marginTop: 10}}
            placeholder="Write Comment"
            placeholderTextColor="grey"
            returnKeyType="done"
            onSubmitEditing={() => handleComment(comment)}
            value={comment}
            fontSize={18}
          />
        ) : null}
      </View>
    </View>
  );
};

const PostHeader = ({post}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 6,
        marginTop: 8,
        marginBottom: 8,
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={{uri: post.profilePicture}} style={styles.userPhoto} />
        <Text style={{color: 'white', marginLeft: 5, fontWeight: '700'}}>
          {post.user}
        </Text>
      </View>
      <Text style={{color: 'white', marginLeft: 5, fontWeight: '900'}}>
        ...
      </Text>
    </View>
  );
};

const PostImage = ({post}) => (
  <View style={{width: '100%', height: 450}}>
    <Image
      source={{uri: post.imageUrl}}
      style={{height: '100%', resizeMode: 'cover'}}
    />
  </View>
);

const PostFooter = ({handleLike, post, setShowComment}) => (
  <View style={{flexDirection: 'row'}}>
    <View style={styles.leftFooterIcon}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image
          style={styles.footerIcon}
          source={{
            uri: post.liked_by_users.includes(firebase.auth().currentUser.email)
              ? postFooterIcons[0].likedImageUrl
              : postFooterIcons[0].imageUrl,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setShowComment();
        }}>
        <Image
          style={styles.footerIcon}
          source={{uri: postFooterIcons[1].imageUrl}}
        />
      </TouchableOpacity>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl} />
    </View>
    <View style={{alignItems: 'flex-end', flex: 1}}>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
);
const Icon = ({imgStyle, imgUrl}) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{uri: imgUrl}} />
  </TouchableOpacity>
);
const Likes = ({post}) => (
  <View style={{flexDirection: 'row', marginTop: 6}}>
    <Text style={{color: 'white', fontWeight: '600'}}>
      {post.liked_by_users.length.toLocaleString('en')} likes
    </Text>
  </View>
);

const Caption = ({post}) => (
  <View style={{marginTop: 5}}>
    <Text style={{color: 'white'}}>
      <Text style={{fontWeight: '600'}}>{post.user.user}</Text>
      <Text style={{}}> {post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({post, setShowCommentSection, showCommentSection}) => (
  <View>
    {post.comments
      ? !!post.comments.length && (
          <TouchableOpacity
            onPress={() => setShowCommentSection(!showCommentSection)}>
            {showCommentSection ? (
              <Text style={{color: 'grey'}}>Hide Comments</Text>
            ) : (
              <Text style={{color: 'grey'}}>
                {}
                View{' '}
                {post.comments.length > 1
                  ? `all ${post.comments.length} comments`
                  : '1 comment'}
              </Text>
            )}
          </TouchableOpacity>
        )
      : null}
  </View>
);

const Comments = ({post}) => (
  <>
    {post.comments
      ? post.comments.map((comment, index) => (
          <View key={index} style={{flexDirection: 'row', marginTop: 3}}>
            <Text style={{color: 'white'}}>
              <Text style={{fontWeight: '600'}}>{comment.user}</Text>
              <Text style={{}}> {comment.comment}</Text>
            </Text>
          </View>
        ))
      : null}
  </>
);
const styles = StyleSheet.create({
  userPhoto: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 8,
    borderWidth: 1.6,
    borderColor: '#ff8501',
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooterIcon: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
});

export default Post;
